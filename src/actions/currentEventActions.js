const URL = 'http://localhost:3000'

export const setCurrentEvent = event => dispatch => {
  dispatch({ type: 'SET_CURRENT_EVENT', event })
}

export const addCurrentEventMessage = message => dispatch => {
  dispatch({ type: 'ADD_CURRENT_EVENT_MESSAGE', message })
}

export const getCurrentEvent = id => dispatch => {
  const config = {
    headers: {
      'Authorization': localStorage.token
    }
  }
  console.log('fetching');
  fetch(URL + `/events/${id}`, config)
  .then(res => res.json())
  .then(event => dispatch(setCurrentEvent(event)))
}
