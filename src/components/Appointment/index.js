import React, { Fragment } from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Empty from "./Empty"
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW)
    })
    .catch(() => transition(ERROR_SAVE, true));
  }
  function remove(){
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => {
      transition(ERROR_DELETE, true)
    })
  }
// above function could be replaced with lines 48-54
  // function destroy(event) {
  //   transition(DELETING, true);
  //   props
  //    .cancelInterview(props.id)
  //    .then(() => transition(EMPTY))
  //    .catch(error => transition(ERROR_DELETE, true));
  //  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          // student={props.interview.student}
          // interviewer={props.interview.interviewer}
          interview = {props.interview}
          onDelete = {() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form 
        interviewer={props.interviewer} 
        interviewers={props.interviewers} 
        onCancel={() => back(EMPTY)}
        bookInterview={props.bookInterview}
        onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status 
        message="Saving"
        />
      )}
      {mode === CONFIRM && (
        <Confirm
        onConfirm={remove}
        onCancel={back}
        message="Are you sure you would like to delete?"
        />
      )}
      {mode === EDIT && (
        <Form
        interviewer={props.interviewer}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
        />
      )}
      {mode === DELETING && (
        <Status
        message="Deleting"
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
        message="Could not save appointment."
        onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
        message="Could not cancel appointment."
        onClose={back}
        />
      )}
    </article>


  )

}