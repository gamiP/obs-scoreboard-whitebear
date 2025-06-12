import { useState, useEffect } from 'react';
import { initialGameData } from './types/gameData.js';
import { themes } from './themes.js';
import './Control.css';

const GAME_DATA_KEY = 'gameData';
const THEME_KEY = 'theme';
const BACKGROUND_KEY = 'background';
const MAX_DIGIT = 999;

export default function Control() {
  const [gameData, setGameData] = useState(initialGameData);
  const [theme, setTheme] = useState('black');
  const [showBackground, setShowBackground] = useState(false);
  const [history, setHistory] = useState([initialGameData]); // 履歴を初期状態で初期化

  // localStorageから復元
  useEffect(() => {
    const savedGameData = localStorage.getItem(GAME_DATA_KEY);
    if (savedGameData) {
      setGameData(JSON.parse(savedGameData));
      setHistory([JSON.parse(savedGameData)]); // 履歴も初期化
      if (window.electronAPI && window.electronAPI.sendGameData) {
        window.electronAPI.sendGameData(JSON.parse(savedGameData));
      }
    }
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      setTheme(savedTheme);
      if (window.electronAPI && window.electronAPI.changeTheme) {
        window.electronAPI.changeTheme(savedTheme);
      }
    }
    const savedBackground = localStorage.getItem(BACKGROUND_KEY);
    if (savedBackground !== null) {
      const showBg = savedBackground === 'true';
      setShowBackground(showBg);
      if (window.electronAPI && window.electronAPI.changeBackground) {
        window.electronAPI.changeBackground(showBg);
      }
    }
  }, []);

  useEffect(() => {
    if (window.electronAPI && window.electronAPI.onGameDataUpdate) {
      window.electronAPI.onGameDataUpdate((newGameData) => {
        setGameData(newGameData);
        setHistory((prev) => [...prev, newGameData]); // 外部から更新された場合も履歴に追加
      });
    }
    if (window.electronAPI && window.electronAPI.onThemeChanged) {
      window.electronAPI.onThemeChanged((themeName) => {
        setTheme(themeName);
      });
    }
    if (window.electronAPI && window.electronAPI.onBackgroundChanged) {
      window.electronAPI.onBackgroundChanged((show) => {
        setShowBackground(show);
      });
    }
  }, []);

  // 保存関数
  const saveGameData = (data) => {
    localStorage.setItem(GAME_DATA_KEY, JSON.stringify(data));
  };
  const saveTheme = (themeName) => {
    localStorage.setItem(THEME_KEY, themeName);
  };
  const saveBackground = (show) => {
    localStorage.setItem(BACKGROUND_KEY, show.toString());
  };

  // 先攻＋後攻の合計
  const totalGames = gameData.turnResults.first + gameData.turnResults.second;
  // 勝ち＋負けの合計
  const totalResults = gameData.matchResults.wins + gameData.matchResults.losses;

  // 勝ち・負けボタンの制御
  const canAddResult = totalResults < totalGames;

  // 試合結果の更新
  const updateMatchResult = (isWin) => {
    if (!canAddResult) return;
    // 3桁制限
    if ((isWin && gameData.matchResults.wins >= MAX_DIGIT) || (!isWin && gameData.matchResults.losses >= MAX_DIGIT)) return;
    setHistory((prev) => [...prev, gameData]); // 履歴に現在の状態を追加
    window.electronAPI.updateMatchResult(isWin);
    const newGameData = {
      ...gameData,
      matchResults: {
        ...gameData.matchResults,
        wins: isWin ? Math.min(gameData.matchResults.wins + 1, MAX_DIGIT) : gameData.matchResults.wins,
        losses: !isWin ? Math.min(gameData.matchResults.losses + 1, MAX_DIGIT) : gameData.matchResults.losses,
      },
    };
    setGameData(newGameData);
    saveGameData(newGameData);
  };

  // 先攻後攻の更新
  const updateTurnResult = (isFirst) => {
    // 3桁制限
    if ((isFirst && gameData.turnResults.first >= MAX_DIGIT) || (!isFirst && gameData.turnResults.second >= MAX_DIGIT)) return;
    setHistory((prev) => [...prev, gameData]); // 履歴に現在の状態を追加
    window.electronAPI.updateTurnResult(isFirst);
    const newGameData = {
      ...gameData,
      turnResults: {
        ...gameData.turnResults,
        first: isFirst ? Math.min(gameData.turnResults.first + 1, MAX_DIGIT) : gameData.turnResults.first,
        second: !isFirst ? Math.min(gameData.turnResults.second + 1, MAX_DIGIT) : gameData.turnResults.second,
      },
    };
    setGameData(newGameData);
    saveGameData(newGameData);
  };

  // テーマ切り替え
  const handleThemeChange = (themeName) => {
    window.electronAPI.changeTheme(themeName);
    saveTheme(themeName);
  };

  // 背景表示切り替え
  const handleBackgroundChange = (event) => {
    const show = event.target.checked;
    setShowBackground(show);
    if (window.electronAPI && window.electronAPI.changeBackground) {
      window.electronAPI.changeBackground(show);
    }
    saveBackground(show);
  };

  // リセットボタン
  const resetData = () => {
    setHistory((prev) => [...prev, initialGameData]); // リセットも履歴に追加
    setGameData(initialGameData);
    window.electronAPI.sendGameData(initialGameData);
    saveGameData(initialGameData);
  };

  // 一つ戻るボタン
  const handleUndo = () => {
    if (history.length <= 1) return; // 最初の状態までしか戻れない
    const prev = history[history.length - 2];
    setGameData(prev);
    setHistory(history.slice(0, -1));
    window.electronAPI.sendGameData(prev);
    saveGameData(prev);
  };

  return (
    <div className="control-panel-wrapper">
      <div className="control-panel">
        <h2>操作パネル</h2>

        <div className="control-section">
          <div className="button-group">
            {Object.entries(themes).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleThemeChange(key)}
                disabled={theme === key}
              >
                {value.name}
              </button>
            ))}
          </div>
          <div className="background-toggle">
            <label>
              <input
                type="checkbox"
                checked={showBackground}
                onChange={handleBackgroundChange}
              />
              <span>背景を表示</span>
            </label>
          </div>
        </div>

        <div className="control-section">
          <h3>先攻後攻</h3>
          <div className="button-group">
            <button onClick={() => updateTurnResult(true)}>先攻</button>
            <button onClick={() => updateTurnResult(false)}>後攻</button>
          </div>
          <div className="stats">
            <p>先攻: {gameData.turnResults.first}</p>
            <p>後攻: {gameData.turnResults.second}</p>
          </div>
        </div>

        <div className="control-section">
          <h3>試合結果</h3>
          <div className="button-group">
            <button onClick={() => updateMatchResult(true)} disabled={!canAddResult}>勝ち</button>
            <button onClick={() => updateMatchResult(false)} disabled={!canAddResult}>負け</button>
          </div>
          <div className="stats-container">
            <div className="stats stats-group">
              <p>勝ち: {gameData.matchResults.wins}</p>
              <p>負け: {gameData.matchResults.losses}</p>
            </div>
            <div className="stats stats-group">
              <p>試合数: {gameData.matchResults.total}</p>
              <p>勝率: {gameData.matchResults.winRate}%</p>
            </div>
          </div>
        </div>

        <div className="button-group">
          <button className="undo-button" onClick={handleUndo} disabled={history.length <= 1}>
            一つ戻る
          </button>
          <button className="reset-button" onClick={resetData}>
            リセット
          </button>
        </div>
      </div>
    </div>
  );
}
