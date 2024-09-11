import React from "react";

export default function Die(props) {
    if(props.change)
        return  <div className="die held" onClick={() => props.click(props.id)}>{props.value}</div>
    else
        return <div className="die" onClick={() => props.click(props.id)}>{props.value}</div>
        
}