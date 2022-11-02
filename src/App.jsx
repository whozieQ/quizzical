import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Questions from './components/Questions'
import GameControls from './components/GameControls'
import questionlist from "./components/data"

const useStaticData = true

function App() {
  const [isStarted, setIsStarted] = useState(false)
  const [questions, setQuestions] = useState([])
  const [isLocked, setIsLocked] = useState(false)
  const [score, setScore] = useState(0)
  const [gameCount, setGameCount] = useState(0)

//on initial load, acquire a set of trivia questions
//never need to run this again
  useEffect(()=>{
      console.log("in useEffect")
      const url = "https://opentdb.com/api.php?amount=5&difficulty=easy"
      fetch(url).then((response)=>response.json())
        .then((data)=>{
          let qData = useStaticData ? questionlist : data 
        setQuestions(qData.results.map((item)=>(
          {
            id: nanoid(),
            question: decodeString(item),
            answers:getAnswerOptions(item),
            score: 0
          }
        ))  
)
  })
    }
    ,[gameCount]
  )

    //the questions and answers will arrive with special characters
    //encoded as HTML e.g. &#49; or some such
    //must decode them so they will display properly
    function decodeString(htmlCodeString){
      let elem = document.createElement('textarea');
      elem.innerHTML = htmlCodeString;
      return elem.value;        
  }

    //the answers arrive split into a group of incorrect answers
    //and a separate listing of the correct answer
    //must mix them together into one list with
    //properties to indicate correct/incorrect and
    //selected or not
    function getAnswerOptions(questionData){
      let answers = questionData.incorrect_answers.map((a)=> {
          return {
              answer: decodeString(a),
              correct: false,
              selected: false,
              id: nanoid() 
          }
      })
      answers.push({
          answer: decodeString(questionData.correct_answer),
          correct: true,
          selected: false,
          id: nanoid() 
  })
      //sort alphabetically since that should be fairly random
      answers.sort(( a, b )=> {
          if ( a.answer < b.answer ){
            return -1;
          }
          if ( a.answer > b.answer ){
            return 1;
          }
          return 0;
        })
        return answers
  }

  function checkAnswers(){
    setIsLocked(true)
    setScore(4)
  }

  function newGame(){
    setScore(0)
    setGameCount(prevCount=>prevCount+1)
    setIsLocked(false)
  }
  
  // <p>questions is {JSON.stringify(questions)}</p>

  return (
    <div className="App">
      { isStarted && <Questions isLocked={isLocked} qData={questions} updateQData={setQuestions}/>}
      <GameControls gameCount={gameCount} isLocked={isLocked} score={score} 
        isStarted={isStarted} checkAnswers={checkAnswers} newGame={newGame}
        setIsStarted={setIsStarted}/>
    </div>
  )

}

export default App
