import React from "react"
import './Questions.css'

//this Component displays a single question and its possible ansswers
//it receives a single question as a property
export default function Question({question,updateQuestion,showResults}){

    //update Selected value in the state property for 
    //this answer in this question
    function handleClick(id){
        updateQuestion(
            {
                ...question,
                answers: question.answers.map(item=>(
                    {
                        ...item,
                        selected: item.id===id ? true : false
                    }
                ))
            }
        )
    }

    //choose the style classes that match selected/correct/incorrect condition
    function getAnswerStyle(answer){
        let classList = "answer--button"
        if (showResults) {
            if (answer.selected) {
                classList = answer.correct ? "answer--button correct" : "answer--button incorrect-selected"
            } else {
                classList = answer.correct ? "answer--button correct" : "answer--button incorrect"
            }
        } else {
            classList = answer.selected ? "answer--button selected" : "answer--button unselected"
        }
        return classList
    }

    //generates JSX elements which render the answer options
    function getAnswersHTML(){
        return (
            question.answers.map(answer=> (
                <div key={answer.id} className="answer--container">
                    <input 
                        className="answer--hidden"
                        onClick={()=>handleClick(answer.id)} 
                        type="radio" 
                        id={answer.id} 
                        name="triviaAnswers" 
                        value={answer.answer}
                    />
                    <label className={getAnswerStyle(answer)} htmlFor={answer.id}>{answer.answer}</label>
                </div>
            ))
        )
    }

  
    return (
        <article className="question">
            <h2 className="question--title">{question.question}</h2>
            <div className="question--answers">
                {getAnswersHTML()}
            </div>
        </article>

    )
}
