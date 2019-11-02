const URL = 'http://localhost:3000'

const setEvents = events => {
  return {
    type: 'SET_EVENTS_HOSTING',
    events
  }
}

export const getEventsHosting = () => dispatch => {
  const config = {
    headers: {
      'Authorization': localStorage.token
    }
  }

  fetch(URL + `/users/${localStorage.id}/created_events`, config)
  .then(res => res.json())
  .then(console.log)
}
