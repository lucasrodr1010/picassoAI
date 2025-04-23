import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function AboutPage() {
  const nav = useNavigate()
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl mb-4">Welcome to Picasso AI!</h1>
      <Button onClick={() => nav('/game')}>
        About
      </Button>
    </div>
  )
}