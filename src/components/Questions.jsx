import React , {useState} from "react"
import questionlist from "./data"
import Question from "./Question"


export default function Questions(props){

    return(
        <div className="App">
            {questionlist.data.map((item)=>(<Question key={item.id} question={item}/>))}
        </div>
    )
}