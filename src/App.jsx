import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Control from './Control';
import Display from './Display';
import './App.css';

function ErrorBoundary() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>エラーが発生しました</h2>
      <p>アプリケーションの再起動をお試しください。</p>
    </div>
  );
}

// タイトルを動的に変更するコンポーネント
const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/display') {
      document.title = '白熊パネル（ディスプレイ）';
    } else {
      document.title = '白熊パネル（コントロール）';
    }
  }, [location]);

  return null;
};

const App = () => {
  return (
    <Router>
      <TitleUpdater />
      <Routes>
        <Route path="/" element={<Control />} />
        <Route path="/display" element={<Display />} />
      </Routes>
    </Router>
  );
};

export default App;
