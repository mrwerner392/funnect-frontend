const URL = 'http://localhost:3000'

const setEvents = events => {
  return {
    type: 'SET_EVENTS_HOSTING',
    events
  }
}

const addEvent = event => {
  return {
    type: 'ADD_EVENT_HOSTING',
    event
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
  .then(events => dispatch(setEvents(events)))
}

export const newEventHosting = eventInfo => dispatch => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      'Accept': 'application/json'
      'Authorization': localStorage.token
    },
    body: JSON.stringify(eventInfo)
  }

  fetch(URL + '/events', config)
  .then(res => res.json())
  .then(console.log)
}

export const setEventsHostingFilter = filter => dispatch => {
  dispatch({ type: 'SET_EVENTS_HOSTING_FILTER', filter })
}
