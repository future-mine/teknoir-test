import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CounterProvider } from './stores/CounterContext';
import CounterListPage from './pages/CounterListPage';
import CounterDetailPage from './pages/CounterDetailPage';
import './App.css';

const App: React.FC = () => {
  return (
    <CounterProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CounterListPage />} />
          <Route path="/counter/:name" element={<CounterDetailPage />} />
        </Routes>
      </Router>
    </CounterProvider>
  );
};

export default App;
