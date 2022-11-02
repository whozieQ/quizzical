import React from 'react'
import './GameControls.css'

//this Component displays action buttons,
//game instructions and game results
export default function GameControls({gameCount, isLocked, 
    score, isStarted, checkAnswers,newGame, setIsStarted, total}){

    //generate the game results text
    function getScore(){
        const correct = score
        const total = total
        return `You scored ${correct} / ${total} correct answers`
    }


    return (
        <div className="controls--container">
            <div className="controls--info">
                { !isStarted && <h1>Quizzical</h1>}
                { !isStarted && <p>Take a break with a simple trivia game.</p>}
                { isLocked && <p>{getScore()}</p>}
            </div>
            <div className="controls--buttons">
                { !isStarted && <button onClick={()=>setIsStarted(true)}>Start quiz</button>}
                { isStarted && !isLocked && <button onClick={checkAnswers}>Check Answers</button>}
                { isLocked && <button onClick={newGame}>New Game</button>}
            </div>
        </div>
  
    )
}

