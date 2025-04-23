import { Routes, Route } from 'react-router-dom';
import StartPage from './pages/start';
import GamePage from './pages/game';

import AboutPage from './pages/about';
import Footer from './components/Footer'
import Header from './components/Header'

export default function App() {
  return (
    <div className="flex flex-col min-w-screen min-h-screen">
      <nav className="a text-[#ffffff]">
      </nav>
      <div>
      <Header/>
      </div>
      <main className="flex-grow px-6">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <div>
      <Footer/>
      </div>
    </div>
    
  );
}
