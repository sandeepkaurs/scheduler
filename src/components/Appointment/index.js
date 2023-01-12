import React, { Fragment } from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Empty from "./Empty"
import Show from "./Show";


export default function Appointment(props) {
  return (
    <div className="appointment">
      <Header time={props.time}/>
      {props.interview && <Show student={props.interview.student} interviewer={props.interview.interviewer} />}
      {!props.interview && <Empty />}
    </div>
    
    
  )
  
}