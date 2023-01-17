import React, { Fragment } from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Empty from "./Empty"
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <div className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form interviewer={props.interviewer} interviewers={[props.interviewers]} onCancel={() => back(EMPTY)} />
      )}
    </div>


  )

}