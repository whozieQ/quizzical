import React , {useState} from "react"
import { nanoid } from 'nanoid'

export default function Question(props){
    //This component receives a single question
    const [question, setQuestion] = React.useState(props.question)
    const [answers, setAnswers] = React.useState( getAnswerOptions())

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
    //must mix them together into one list to display
    function getAnswerOptions(){
        let answers = question.incorrect_answers.map((a)=> {
            return {
                answer: a,
                correct: false,
                selected: false,
                id: nanoid() 
            }
        })
        answers.push({
            answer: question.correct_answer,
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


    return (
        <article className="question">
            <h2 className="question--title">{decodeString(question.question)}</h2>
            <div className="question--answers">
                {answers.map((answer)=><button key={answer.id}>{decodeString(answer.answer)}</button>)}
            </div>
        </article>

    )
}
