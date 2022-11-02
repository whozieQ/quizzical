import React , {useState} from "react"
import { nanoid } from 'nanoid'

export default function Question(props){
    let question = props.question
    //props
    //question
    //showResults (same as isLocked)

    //update Selected value in the state property for this answer
    function handleClick(id){
        setQuestion((prevQuestion)=>{
            return (
                {
                    ...prevQuestion,
                    answers: prevQuestion.answers.map(item=>(
                        {
                            ...item,
                            selected: item.id===id ? true : false
                        }
                    ))
                }
            )
        })
    }

    function getAnswerStyle(answer){
        let classList = "answer--button"
        if (props.showResults) {
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

    function getHTML(){
        return (
            question.answers.map(answer=> (
                <div key={answer.id}>
                    <input 
                        className="answer--hidden"
                        onClick={()=>handleClick(answer.id)} 
                        type="radio" 
                        id={answer.id} 
                        name="fav_language" 
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
                {getHTML()}
            </div>
        </article>

    )
}
