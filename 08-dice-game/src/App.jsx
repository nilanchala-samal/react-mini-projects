import './App.css'
import styled from 'styled-components'
import StartMenu from './components/StartMenu'
import { useState } from 'react'
import PlayGame from './components/PlayGame'


function App() {
  const [isGameStarted, setIsGameStarted] = useState(false)
  const toggleGamePlay = () => {
    setIsGameStarted(prev => !prev)
  }
  return (
    <>
      {isGameStarted ? <PlayGame /> : <StartMenu toggle={toggleGamePlay}/>}
    </>
  )
}

export default App
