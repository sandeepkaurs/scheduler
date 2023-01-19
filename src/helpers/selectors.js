export function getAppointmentsForDay(state, name) {
  const filteredDays = state.days.filter(day => day.name === name);
  if (state.days.length === 0 || filteredDays.length === 0) {
    return [];
  }
  // find today/day we're looking for
  // const filteredDays = state.days.filter( dayObject => dayObject.name === day);
  // filter always returns an array, we wanted first element of array hence [0]
  
  const currentDay = filteredDays[0];
  
  if (!currentDay) {
    return [];
  }
  // transformed by using .map appointment id into the appointment object
  const mappedDays = currentDay.appointments.map((appointmentID) => {
    const appointment = state.appointments[appointmentID]
    return appointment;
  })
  //map creates array, takes all return value and returns them in an array
  
  return mappedDays;
}

export function getInterview(state, interview) {
  if(!interview) return null;
  const filteredInterview = {};
  filteredInterview.student = interview.student;
  filteredInterview.interviewer = state.interviewers[interview.interviewer];
  return filteredInterview;

}

export function getInterviewersForDay(state, name) {
  const filteredDays = state.days.find(day => day.name === name);
  if(state.days.length === 0 || !filteredDays) {
    return [];
  }
  const interviewersFromDays = filteredDays.interviewers;
  const filteredInterviewers = [];
  for(let interviewer of interviewersFromDays) {
    filteredInterviewers.push(state.interviewers[interviewer]);
  }
  return filteredInterviewers;
}