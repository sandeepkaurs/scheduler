import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

  const { name, avatar, selected, id} = props;
  const interviewerListItemClass = classNames("interviewer__item", {"interviewers_item--selected":selected,
  })

  return(
    < li className={interviewerListItemClass} selected={selected} onClick={() => props.setInterviewer(id)}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li >
  );
}
