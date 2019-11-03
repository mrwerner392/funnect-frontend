const URL = 'http://localhost:3000'

const setEvents = events => {
  return {
    type: 'SET_EVENTS_ATTENDING',
    events
  }
}

const newEventAttendingMessage = message => dispatch => {
  dispatch({ type: 'ADD_EVENT_ATTENDING_MESSAGE', message })
}

export const getEventsAttending = () => dispatch => {
  const config = {
    headers: {
      'Authorization': localStorage.token
    }
  }

  fetch(URL + `/users/${localStorage.id}/events_attended`, config)
  .then(res => res.json())
  .then(events => dispatch(setEvents(events)))
}

export const setEventsAttendingFilter = filter => dispatch => {
  dispatch ({ type: 'SET_EVENTS_ATTENDING_FILTER', filter })
}
