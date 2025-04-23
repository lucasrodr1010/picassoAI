import { Routes, Route } from 'react-router-dom'
import StartPage  from '../pages/start'
import GamePage   from '../pages/game'
import AboutPage  from '../pages/about'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/"        element={<StartPage />}  />
      <Route path="/game"    element={<GamePage />}   />
      <Route path="/about"   element={<AboutPage />}  />
    </Routes>
  )
}