import { useEffect, useState } from 'react';
import { initialGameData } from './types/gameData.js';
import { themes } from './themes.js';
import './Display.css';

export default function Display() {
  const [gameData, setGameData] = useState(initialGameData);
  const [theme, setTheme] = useState('black');
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    if (window.electronAPI && window.electronAPI.onGameDataUpdate) {
      window.electronAPI.onGameDataUpdate((newGameData) => {
        setGameData(newGameData);
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

  // 勝率計算（0割防止）
  const calcRate = (num, total) => total === 0 ? 0 : Math.round((num / total) * 100);

  // 背景色の決定
  const getBackgroundStyle = () => {
    console.log('Current background state:', showBackground, 'Theme:', theme);
    const color = !showBackground ? '#00ff00' : (theme === 'black' ? '#ffffff' : '#000000');
    return {
      backgroundColor: color,
      background: color
    };
  };

  const backgroundStyle = getBackgroundStyle();
  console.log('Applied background style:', backgroundStyle);

  return (
    <div 
      className={`display-chromakey-bg ${themes[theme].className}`}
      style={{
        ...backgroundStyle,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <table className="display-table">
        <tbody>
          <tr>
            <th style={{writingMode: 'horizontal-tb'}}>先攻</th>
            <td>{gameData.turnResults.first}</td>
            <td>{calcRate(gameData.turnResults.first, gameData.matchResults.total)}%</td>
            <th style={{writingMode: 'horizontal-tb'}}>勝ち</th>
            <td>{gameData.matchResults.wins}</td>
            <td>{calcRate(gameData.matchResults.wins, gameData.matchResults.total)}%</td>
          </tr>
          <tr>
            <th style={{writingMode: 'horizontal-tb'}}>後攻</th>
            <td>{gameData.turnResults.second}</td>
            <td>{calcRate(gameData.turnResults.second, gameData.matchResults.total)}%</td>
            <th style={{writingMode: 'horizontal-tb'}}>負け</th>
            <td>{gameData.matchResults.losses}</td>
            <td>{calcRate(gameData.matchResults.losses, gameData.matchResults.total)}%</td>
          </tr>
          <tr>
            <th style={{writingMode: 'horizontal-tb'}}>試合数</th>
            <td>{gameData.matchResults.total}</td>
            <th style={{writingMode: 'horizontal-tb'}}>勝率</th>
            <td>{gameData.matchResults.winRate}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
