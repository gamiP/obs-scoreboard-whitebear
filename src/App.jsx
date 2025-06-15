import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Control />} />
        <Route path="/display" element={<Display />} />
      </Routes>
    </Router>
  );
};

export default App;
