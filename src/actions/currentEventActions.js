export const setCurrentEvent = event => dispatch => {
  dispatch({ type: 'SET_CURRENT_EVENT', event })
}

export const addCurrentEventMessage = message => dispatch => {
  dispatch({ type: 'ADD_CURRENT_EVENT_MESSAGE', message })
}
