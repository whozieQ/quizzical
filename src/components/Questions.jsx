import React , {useState} from "react"
import questionlist from "./data"
import Question from "./Question"
import "./Questions.css"


export default function Questions(props){
    //tracks whether quiz is still in progress or
    //if user has submitted answers for grading
    const [showResults,setShowResults] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0)

   
    function checkResults(){
        setShowResults(true)
    }

    function newGame(){
        console.log("New Game!")
        //TODO: get new questions
        setShowResults(false)
    }

    function getScore(){
        //TODO: calculate number of correct answers
        const correct = 5
        //TODO: use length of the questions array as the total
        const total = 5
        return `You scored ${correct} / ${total} correct answers`
    }

    //child component will call this passing in its ID
 //   setCorrectAnswers((prevAnswers, id)=>{
//TODO update this to keep existing answers and update just the answer from the child that called it
 //   },[])
//setCorrectAnswers={()=>setCorrectAnswers(item.id)}
    
    return(
        <div className="App">
            {questionlist.data.map((item)=>(<Question key={item.id} question={item} showResults={showResults} scoreResult={setCorrectAnswers}/>))}
            <div>
                {showResults && <p>{getScore()}</p> }
                {showResults ? 
                <button onClick={newGame}>Play again</button>
                :
                <button onClick={checkResults}>Check answers</button>
            }
            </div>
        </div>
    )
}