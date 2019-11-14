const URL = 'http://localhost:3000'

const setEvents = events => {
  return {
    type: 'SET_EVENTS_HOSTING',
    events
  }
}

export const addEvent = event => dispatch => {
  dispatch({ type: 'ADD_EVENT_HOSTING', event })
}

const updateEvent = event => {
  return {
    type: 'UPDATE_EVENT_HOSTING',
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

export const clearEventsHosting = () => dispatch => {
  dispatch({ type: 'CLEAR_EVENTS_HOSTING' })
}

export const newEventHosting = eventInfo => dispatch => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': localStorage.token
    },
    body: JSON.stringify(eventInfo)
  }

  fetch(URL + '/events', config)
  .then(res => res.json())
  .then(event => dispatch(addEvent(event)))
}

export const updateEventHostingTime = (eventInfo, id) => dispatch => {
  const config = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': localStorage.token
    },
    body: JSON.stringify(eventInfo)
  }

  fetch(URL + `/events/${id}/update_time`, config)
  .then(res => res.json())
  .then(event => dispatch(updateEvent(event)))
}

export const addEventHostingMessage = (message, eventId) => dispatch => {
  dispatch({ type: 'ADD_EVENT_HOSTING_MESSAGE', message, eventId })
}

export const toggleEventsHostingNewMessagesExist = () => dispatch => {
  dispatch({ type: 'TOGGLE_EVENTS_HOSTING_NEW_MESSAGES_EXIST' })
}

export const setEventsHostingFilter = filter => dispatch => {
  dispatch({ type: 'SET_EVENTS_HOSTING_FILTER', filter })
}
