const URL = 'http://localhost:3000'

const setEvents = events => {
  return {
    type: 'SET_EVENTS_ATTENDING',
    events
  }
}

export const getEventsAttending = () => dispatch => {
  const config = {
    headers: {
      'Authorization': localStorage.token
    }
  }

  fetch(URL + `/users/${localStorage.id}/events_attended`, config)
  .then(res => res.json())
  .then(console.log)
}
