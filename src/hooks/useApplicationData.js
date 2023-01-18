import { useState, useEffect } from "react";
import Axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //function below will set day inside useState above
  const setDay = day => {
    return setState({ ...state, day })
  };

  useEffect(() => {
    const dayURL = "http://localhost:8001/api/days";
    const appointmentURL = "http://localhost:8001/api/appointments";
    const interviewersURL = "http://localhost:8001/api/interviewers";
    //get request below is for 1 api end point
    Promise.all([
      Axios.get(dayURL),
      Axios.get(appointmentURL),
      Axios.get(interviewersURL)
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

  //find the day
  function findDay(day) {
    const daysOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return daysOfWeek[day]
  }

  //function below to book interview
  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayOfWeek = findDay(state.day)

    let day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek]
    }

    if (!state.appointments[id].interview) {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots - 1
      }
    } else {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots
      }
    }
    let days = state.days
    days[dayOfWeek] = day;

    const url = `http://localhost:8001/api/appointments/${id}`;
    let req = {
      url,
      method: 'PUT',
      data: appointment
    }
    return Axios(req).then(response => {

      console.log("response from book", response.data)
      setState({
        ...state,
        appointments,
        days
      });
      
    })
  }

  //function below to cancel interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // implemented spots remaining
    const dayOfWeek = findDay(state.day)

    let day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots + 1
    }

    let days = state.days;
    console.log("these are the days", days)
    days[dayOfWeek] = day

    const url = `http://localhost:8001/api/appointments/${id}`;
    let req = {
      url,
      method: 'DELETE',
      data: appointment
    }
    return Axios(req).then(response => {
      console.log("response from delete", response);
      setState({
        ...state,
        appointments,
        days
      });
    })
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}


// what does a spread operator do?

// -makes a shallow copy is what we use the spread operator for
// strips off the outer braces