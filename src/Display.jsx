import { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { themes } from './themes.js';
import './Display.css';
import DisplayStandardLayout from './components/layouts/DisplayStandardLayout';
import DisplayWideLayout from './components/layouts/DisplayWideLayout';
import DisplayCompactLayout from './components/layouts/DisplayCompactLayout';

const initialGameData = {
  turnResults: {
    first: 0,
    second: 0
  },
  matchResults: {
    wins: 0,
    losses: 0,
    total: 0,
    winRate: 0
  }
};

const DisplayContent = () => {
  const { dict, changeLang } = useLanguage();
  const [gameData, setGameData] = useState(initialGameData);
  const [theme, setTheme] = useState('black');
  const [showBackground, setShowBackground] = useState(true);
  const [layout, setLayout] = useState('standard');

  // テーマの変更を監視
  useEffect(() => {
    const handleThemeChange = (newTheme) => {
      console.log('Theme change received:', newTheme);
      console.log('Available themes:', themes);
      console.log('Selected theme config:', themes[newTheme]);
      setTheme(newTheme);
    };

    ipcRenderer.on('change-theme', (_, newTheme) => handleThemeChange(newTheme));

    // 背景表示の変更を監視
    ipcRenderer.on('background-change', (_, show) => {
      console.log('Background change:', show);
      setShowBackground(show);
    });

    // ゲームデータの更新を監視
    ipcRenderer.on('update-game-data', (_, newData) => {
      setGameData(newData);
    });

    // 言語の変更を監視
    ipcRenderer.on('change-language', (_, { type, lang }) => {
      if (type === 'display') {
        changeLang(lang);
      }
    });

    // 保存されたデータを復元
    const savedData = localStorage.getItem('gameData');
    if (savedData) {
      setGameData(JSON.parse(savedData));
    }

    return () => {
      ipcRenderer.removeAllListeners('change-theme');
      ipcRenderer.removeAllListeners('background-change');
      ipcRenderer.removeAllListeners('update-game-data');
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

  const calcRate = (value, total) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  // 現在のテーマの設定を取得
  const currentTheme = themes[theme];
  console.log('Current theme state:', {
    theme,
    currentTheme,
    showBackground,
    backgroundColor: showBackground ? currentTheme.background : '#00ff00',
    textColor: currentTheme.color
  });

  return (
    <div
      className={`display-chromakey-bg ${currentTheme.className}`}
      style={{
        backgroundColor: showBackground ? currentTheme.background : '#00ff00',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <div style={{ fontSize: '1.1em', color: '#888', marginBottom: 4 }}>Layout: {layout}</div>
      {layout === 'standard' && (
        <DisplayStandardLayout
          dict={dict}
          gameData={gameData}
          currentTheme={currentTheme}
          showBackground={showBackground}
          calcRate={calcRate}
        />
      )}
      {layout === 'wide' && (
        <DisplayWideLayout
          dict={dict}
          gameData={gameData}
          currentTheme={currentTheme}
          showBackground={showBackground}
          calcRate={calcRate}
        />
      )}
      {layout === 'compact' && (
        <DisplayCompactLayout
          dict={dict}
          gameData={gameData}
          currentTheme={currentTheme}
          showBackground={showBackground}
          calcRate={calcRate}
        />
      )}
    </div>
  );
};

const Display = () => (
  <LanguageProvider type="display">
    <DisplayContent />
  </LanguageProvider>
);

export default Display;
