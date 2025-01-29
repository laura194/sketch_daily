import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UnsplashDaily from './UnsplashDaily'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UnsplashDaily/>
    </>
  )
}

export default App
