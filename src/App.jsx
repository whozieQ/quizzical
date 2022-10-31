import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Start from './components/Start'
import Questions from './components/Questions'
import { nanoid } from 'nanoid'


function App() {
  const [isStarted, setIsStarted] = useState(false)
  const [questions, setQuestions] = useState([])

//on initial load, acquire a set of trivia questions
//never need to run this again
  useEffect(()=>{
      console.log("in useEffect")
      const url = "https://opentdb.com/api.php?amount=5&difficulty=easy"
      fetch(url).then((response)=>response.json())
        .then((data)=>setQuestions(data.results.map((item)=>(
          {
            ...item,
            id: nanoid()
          }
        )

        )))
    }
    ,[]
  )

// switch from the Start component to the Questions component being displayed
  function startQuiz(){
    setIsStarted(true)
  }
  
  return isStarted ? <Questions data={questions} /> : <Start onClick={startQuiz} />

}

export default App
