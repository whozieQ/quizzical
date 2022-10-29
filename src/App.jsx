import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Start from './components/Start'
import Questions from './components/Questions'

function App() {
  const [isStarted, setIsStarted] = useState(false)

  function startQuiz(){
    setIsStarted(true)
  }

  return (
     isStarted ? <Questions /> : <Start onClick={startQuiz}/>
  )
}

export default App
