import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function StartPage() {
  const nav = useNavigate()
  return (
    <div className="w-full-screen items-center">
      <h1 className="text-4xl w-full mb-4">Welcome to Picasso AI!</h1>
      <Button onClick={() => nav('/game')}>
        Start Game
      </Button>
    </div>
  )
}