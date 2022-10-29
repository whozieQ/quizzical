import React from 'react'

export default function Start(props) {
    return (
      <div className="App">
        <h1>Quizzical</h1>
        <p>Take a break with a simple trivia game.</p>
        <button onClick={props.onClick}>Start quiz</button>
      </div>
    )
  }
  
