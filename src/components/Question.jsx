import React , {useState} from "react"
import { nanoid } from 'nanoid'

export default function Question(props){
    //This component receives a single question
    const [question, setQuestion] = React.useState(
        {
            ...props.question, 
            question: decodeString(props.question.question),
            answers:getAnswerOptions()}
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
    function getAnswerOptions(){
        let answers = props.question.incorrect_answers.map((a)=> {
            return {
                answer: decodeString(a),
                correct: false,
                selected: false,
                id: nanoid() 
            }
        })
        answers.push({
            answer: decodeString(props.question.correct_answer),
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

    //update Selected value in the state property for this answer
    function handleClick(id){
        setQuestion((prevQuestion)=>{
            const newAnswers = prevQuestion.answers.map(item=>(
                {
                    ...item,
                    selected: item.id===id ? true : false
                }
            ))
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
                        value={decodeString(answer.answer)}
                    />
                    <label className={answer.selected ? "answer--button selected": "answer--button"} htmlFor={answer.id}>{answer.answer}</label>
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
