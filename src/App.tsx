import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import StartPage from './pages/start';
import GamePage from './pages/game';
import FinishPage from './pages/results';
import AboutPage from './pages/about';
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="flex flex-col min-w-screen min-h-screen">
      <nav className="bg-gray-800 text-white p-4">
      </nav>
      <main className="flex-grow p-6">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/finish" element={<FinishPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}
