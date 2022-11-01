import React , {useState} from "react"
import { nanoid } from 'nanoid'

export default function Question(props){
    //This component receives a single question
    //decode the display strings
    //create an answers array
    const [question, setQuestion] = React.useState(
        {
            ...props.question, 
            question: decodeString(props.question.question),
            answers: getAnswerOptions(),
            correct: 0
        })
 
// TODO: useEffect to push the updated Question data back up 
//to the Questions component
//Instead of updating the questions themselves when an answer is selected,
// consider just maintaining a totally separate array for the answers, to simplify things??


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
        const thisAnswer = question.answers.find(element=> element.id === id )
        //update the question state to record that this question has been answered
        //correctly or not
        setQuestion(prevQuestion => (
            {
                ...prevQuestion,
                correct: thisAnswer.correct ? 1 : 0
            }
        ))

        if (!props.showResults) {
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
        } else {
            console.log("Answers cannot be changed after scoring")
        }
        // if showResults is true then clicking the answer should do nothing
        //as the results have already been scored
    }

    function getAnswerStyle(answer){
        console.log(`${question.question} ${question.correct}`)
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
                        value={decodeString(answer.answer)}
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
