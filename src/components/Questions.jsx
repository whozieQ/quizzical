import React , {useState} from "react"
import questionlist from "./data"
import Question from "./Question"
import "./Questions.css"


export default function Questions(props){
    //tracks whether quiz is still in progress or
    //if user has submitted answers for grading
    const [showResults,setShowResults] = useState(false);

    //TODO: need to receive updated Questions data from the child
    //Question components so that we have access to selected answers
    //Instead of updating the questions themselves, consider just maintaining
    //a totally separate array for the answers, to simplify things?
    
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
    return(
        <div className="App">
            {questionlist.data.map((item)=>(<Question key={item.id} question={item}/>))}
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