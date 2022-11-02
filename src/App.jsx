import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Questions from './components/Questions'
import GameControls from './components/GameControls'
import questionlist from "./components/data"

const useStaticData = true
const numQuestions = 5

function App() {
//has user clicked on start game
  const [isStarted, setIsStarted] = useState(false)
//instances of new set of questions
//lets us track when Play Again has been clicked
//and we need new questions
  const [gameCount, setGameCount] = useState(0)
//has user clicked on check answers
  const [isLocked, setIsLocked] = useState(false)
//the current set of questions
  const [questions, setQuestions] = useState([])
//the current number of correct answers
  const [score, setScore] = useState(0)

//any time the game count changes get a new set of questions
  useEffect(()=>{
      const url = `https://opentdb.com/api.php?amount=${numQuestions}&difficulty=easy`
      fetch(url).then((response)=>response.json())
        .then((data)=>{
          let qData = useStaticData ? questionlist : data 
          //restructure the API data more simply and ready to use
          //add a unique ID to each question
          let tempQ = qData.results.map(item=>(
            {
              id: nanoid(),
              question: decodeString(item.question),
              answers: getAnswerOptions(item)
            }
          )) 
        setQuestions(tempQ)
      })
    }
    ,[gameCount]
  )

//update the score any time the questions data changes
  useEffect(()=>{
    let totalScore = 0
    //iterate through each question
    for (let i=0; i < questions.length; i++){
      let answerSet = questions[i].answers
      //is any answer both correct and selected
      let thisScore = answerSet.some((answer)=>answer.correct && answer.selected) ? 1 : 0
      totalScore = totalScore + thisScore
    }
    setScore(totalScore)
  },[questions])

    //the questions text and answer text will arrive with special characters
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
      //TODO consider changing this to a truly random sort
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

  //this is called by child component whenever the
  //selected answer for a question changes
  function updateQuestion(question){
    setQuestions(prevData=>(
      prevData.map(item=> question.id === item.id ? question : item )
    ))
  }

  //user clicks the Check Answers button
  function checkAnswers(){
    setIsLocked(true)
  }

  //user clicks the Play Again button
  function newGame(){
    setScore(0)
    setGameCount(prevCount=>prevCount+1)
    setIsLocked(false)
  }
  
  return (
    <div className="App">
      { isStarted && <Questions isLocked={isLocked} qData={questions} updateQData={updateQuestion}/>}
      <GameControls gameCount={gameCount} isLocked={isLocked} score={score} 
        isStarted={isStarted} checkAnswers={checkAnswers} newGame={newGame}
        setIsStarted={setIsStarted} total={numQuestions}/>
    </div>
  )

}

export default App
