import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  // URLのハッシュを取得
  const hash = window.location.hash.replace('#', '');
  
  // 開発環境でのパス判定
  if (process.env.NODE_ENV === 'development') {
    if (window.location.pathname === '/display') {
      return <Display />;
    }
    if (window.location.pathname === '/control') {
      return <Control />;
    }
  }

  // 本番環境用のルーティング
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/control" replace />} />
        <Route path="/control" element={<Control />} errorElement={<ErrorBoundary />} />
        <Route path="/display" element={<Display />} errorElement={<ErrorBoundary />} />
        <Route path="*" element={<ErrorBoundary />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
