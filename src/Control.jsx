import { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { themes } from './themes.js';
import './Control.css';

const GAME_DATA_KEY = 'gameData';

const initialGameData = {
  turnResults: {
    first: 0,
    second: 0
  },
  matchResults: {
    wins: 0,
    losses: 0,
    total: 0,
    winRate: 0,
    firstWins: 0,
    secondWins: 0
  },
  coinResults: {
    heads: 0,
    tails: 0
  }
};

const MAX_DIGIT = 999;

const ControlContent = () => {
  const { dict, changeLang } = useLanguage();
  const [gameData, setGameData] = useState({ ...initialGameData });
  const [theme, setTheme] = useState('black');
  const [showBackground, setShowBackground] = useState(true);
  const [history, setHistory] = useState([initialGameData]);
  const [layout, setLayout] = useState('standard');
  const [lastTurn, setLastTurn] = useState(null);

  const totalGames = (gameData.turnResults.first || 0) + (gameData.turnResults.second || 0);
  const matchInputCount = (gameData.matchResults.wins || 0) + (gameData.matchResults.losses || 0);
  const matchButtonDisabled = totalGames === 0 || matchInputCount >= totalGames;
  const coinInputCount = (gameData.coinResults.heads || 0) + (gameData.coinResults.tails || 0);

  useEffect(() => {
    // テーマの変更を監視
    ipcRenderer.on('change-theme', (_, newTheme) => {
      setTheme(newTheme);
    });

    // 保存されたデータを復元
    const savedData = localStorage.getItem(GAME_DATA_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // coinResultsがなければ初期値を補完
      if (!parsedData.coinResults) {
        parsedData.coinResults = { heads: 0, tails: 0 };
      }
      setGameData(parsedData);
      setHistory([parsedData]);
    }

    return () => {
      ipcRenderer.removeAllListeners('change-theme');
    };
  }, []);

  useEffect(() => {
    ipcRenderer.on('change-language', (_, { type, lang }) => {
      if (type === 'control') {
        changeLang(lang);
      }
    });
    return () => {
      ipcRenderer.removeAllListeners('change-language');
    };
  }, [changeLang]);

  useEffect(() => {
    ipcRenderer.on('change-layout', (_, newLayout) => {
      setLayout(newLayout);
    });
    return () => {
      ipcRenderer.removeAllListeners('change-layout');
    };
  }, []);

  const handleBackgroundChange = (event) => {
    const newShowBackground = event.target.checked;
    setShowBackground(newShowBackground);
    ipcRenderer.send('background-change', newShowBackground);
  };

  const updateTurnResult = (isFirst) => {
    const newGameData = JSON.parse(JSON.stringify(gameData));
    if (isFirst) {
      newGameData.turnResults.first = Math.min(newGameData.turnResults.first + 1, MAX_DIGIT);
      setLastTurn('first');
    } else {
      newGameData.turnResults.second = Math.min(newGameData.turnResults.second + 1, MAX_DIGIT);
      setLastTurn('second');
    }
    setGameData(newGameData);
    setHistory([...history, JSON.parse(JSON.stringify(newGameData))]);
    localStorage.setItem(GAME_DATA_KEY, JSON.stringify(newGameData));
    ipcRenderer.send('update-game-data', newGameData);
  };

  const updateMatchResult = (isWin) => {
    const newGameData = JSON.parse(JSON.stringify(gameData));
    if (isWin) {
      newGameData.matchResults.wins = Math.min(newGameData.matchResults.wins + 1, MAX_DIGIT);
      if (lastTurn === 'first') {
        newGameData.matchResults.firstWins = (newGameData.matchResults.firstWins || 0) + 1;
      } else if (lastTurn === 'second') {
        newGameData.matchResults.secondWins = (newGameData.matchResults.secondWins || 0) + 1;
      }
    } else {
      newGameData.matchResults.losses = Math.min(newGameData.matchResults.losses + 1, MAX_DIGIT);
    }
    newGameData.matchResults.total = newGameData.matchResults.wins + newGameData.matchResults.losses;
    newGameData.matchResults.winRate = Math.round((newGameData.matchResults.wins / newGameData.matchResults.total) * 100);

    setGameData(newGameData);
    setHistory([...history, JSON.parse(JSON.stringify(newGameData))]);
    localStorage.setItem(GAME_DATA_KEY, JSON.stringify(newGameData));
    ipcRenderer.send('update-game-data', newGameData);
  };

  const updateCoinResult = (isHeads) => {
    const newGameData = JSON.parse(JSON.stringify(gameData));
    const totalGames = (newGameData.turnResults.first || 0) + (newGameData.turnResults.second || 0);
    const coinInputCount = (newGameData.coinResults.heads || 0) + (newGameData.coinResults.tails || 0);
    // 入力数が試合数以上なら何もしない
    if (coinInputCount >= totalGames) return;
    if (isHeads) {
      newGameData.coinResults.heads = Math.min((newGameData.coinResults.heads || 0) + 1, MAX_DIGIT);
    } else {
      newGameData.coinResults.tails = Math.min((newGameData.coinResults.tails || 0) + 1, MAX_DIGIT);
    }
    setGameData(newGameData);
    setHistory([...history, JSON.parse(JSON.stringify(newGameData))]);
    localStorage.setItem(GAME_DATA_KEY, JSON.stringify(newGameData));
    ipcRenderer.send('update-game-data', newGameData);
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    const newHistory = history.slice(0, -1);
    const previousState = newHistory[newHistory.length - 1];
    setGameData(previousState);
    setHistory(newHistory);
    localStorage.setItem(GAME_DATA_KEY, JSON.stringify(previousState));
    ipcRenderer.send('update-game-data', previousState);
    // lastTurnも巻き戻す
    // 直前のターン情報を復元（なければnull）
    if (newHistory.length > 1) {
      const beforePrev = newHistory[newHistory.length - 2];
      if (beforePrev.turnResults.first !== previousState.turnResults.first) setLastTurn('first');
      else if (beforePrev.turnResults.second !== previousState.turnResults.second) setLastTurn('second');
      else setLastTurn(null);
    } else {
      setLastTurn(null);
    }
  };

  const resetData = () => {
    const resetObj = JSON.parse(JSON.stringify(initialGameData));
    setGameData(resetObj);
    setHistory([...history, JSON.parse(JSON.stringify(resetObj))]);
    setLastTurn(null);
    localStorage.setItem(GAME_DATA_KEY, JSON.stringify(resetObj));
    ipcRenderer.send('update-game-data', resetObj);
  };

  return (
    <div className="control-panel-wrapper">
      <div className="control-panel">
        <h2>{dict.title}</h2>

        <div style={{ fontSize: '1.1em', color: '#888', marginBottom: 4 }}>{dict.layout}: {layout}</div>
        <div className="control-section">
          <div className="button-group">
            <label className="background-toggle">
              <input
                type="checkbox"
                checked={showBackground}
                onChange={handleBackgroundChange}
              />
              <span>{dict.background}</span>
            </label>
          </div>
        </div>

        <div className="control-section">
          <h3>{dict.coinTitle}</h3>
          <div className="button-group">
            <button onClick={() => updateCoinResult(true)} disabled={coinInputCount >= totalGames}>{dict.coinHeads}</button>
            <button onClick={() => updateCoinResult(false)} disabled={coinInputCount >= totalGames}>{dict.coinTails}</button>
          </div>
          <div className="stats">
            <p>{dict.coinHeads}: {gameData.coinResults?.heads ?? 0}</p>
            <p>{dict.coinTails}: {gameData.coinResults?.tails ?? 0}</p>
          </div>
        </div>

        <div className="control-section">
          <h3>{dict.turnTitle}</h3>
          <div className="button-group">
            <button onClick={() => updateTurnResult(true)}>{dict.first}</button>
            <button onClick={() => updateTurnResult(false)}>{dict.second}</button>
          </div>
          <div className="stats">
            <p>{dict.first}: {gameData.turnResults.first}</p>
            <p>{dict.second}: {gameData.turnResults.second}</p>
          </div>
          <div className="stats">
            <p>{dict.firstWin}: {gameData.matchResults.firstWins ?? 0}</p>
            <p>{dict.secondWin}: {gameData.matchResults.secondWins ?? 0}</p>
          </div>
        </div>

        <div className="control-section">
          <h3>{dict.matchTitle}</h3>
          <div className="button-group">
            <button
              onClick={() => updateMatchResult(true)}
              disabled={matchButtonDisabled}
            >
              {dict.win}
            </button>
            <button
              onClick={() => updateMatchResult(false)}
              disabled={matchButtonDisabled}
            >
              {dict.lose}
            </button>
          </div>
          <div className="stats-container">
            <div className="stats stats-group">
              <p>{dict.win}: {gameData.matchResults.wins}</p>
              <p>{dict.lose}: {gameData.matchResults.losses}</p>
            </div>
            <div className="stats stats-group">
              <p>{dict.games}: {gameData.matchResults.total}</p>
              <p>{dict.winRate}: {gameData.matchResults.winRate}%</p>
            </div>
          </div>
        </div>

        <div className="button-group">
          <button className="undo-button" onClick={handleUndo} disabled={history.length <= 1}>
            {dict.undo}
          </button>
          <button className="reset-button" onClick={resetData}>
            {dict.reset}
          </button>
        </div>
      </div>
    </div>
  );
};

const Control = () => (
  <LanguageProvider type="control">
    <ControlContent />
  </LanguageProvider>
);

export default Control;