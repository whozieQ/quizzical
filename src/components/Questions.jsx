import React , {useState} from "react"
import Question from "./Question"
import "./Questions.css"


export default function Questions(props){
    const isLocked = props.isLocked
    const qData = props.qData
    const updateQData = function () {props.updateQData}
    
    return(
        <div className="questions--container">
            {props.qData.map((item)=>(<Question key={item.id} question={item} showResults={props.isLocked}/>))}
        </div>
    )
}