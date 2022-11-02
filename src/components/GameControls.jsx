import React from 'react'
import './GameControls.css'

export default function GameControls(props){

    function getScore(){
        const correct = props.score
        //TODO: This is hard-coded but really should be determined
        //dynamically incase the game changes
        const total = 5
        return `You scored ${correct} / ${total} correct answers`
    }


    return (
        <div className="controls--container">
            <div className="controls--info">
                { !props.isStarted && <h1>Quizzical</h1>}
                { !props.isStarted && <p>Take a break with a simple trivia game.</p>}
                <p>gameCount is {props.gameCount}</p>
                <p>isStarted is {props.isStarted.toString()}</p>
                <p>isLocked is {props.isLocked.toString()}</p>
                { props.isLocked && <p>{getScore()}</p>}
            </div>
            <div className="controls--buttons">
                { !props.isStarted && <button onClick={()=>props.setIsStarted(true)}>Start Game</button>}
                { props.isStarted && !props.isLocked && <button onClick={props.checkAnswers}>Check Answers</button>}
                { props.isLocked && <button onClick={props.newGame}>New Game</button>}
            </div>
        </div>
  
    )
}