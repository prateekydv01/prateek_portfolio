import { useState } from 'react'
import './App.css'
import SpacePortfolio from './pages/SpacePortfolio'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <SpacePortfolio/>
    </>
  )
}

export default App
