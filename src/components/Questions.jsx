import React from "react"
import Question from "./Question"
import "./Questions.css"


//this component acts as a container to hold the list of questions
//it recieves the full list of questions as a property
export default function Questions({isLocked,qData,updateQData}){
    return(
        <div className="questions--container">
            {qData.map((item)=>(<Question key={item.id} question={item} updateQuestion={updateQData} showResults={isLocked}/>))}
        </div>
    )
}