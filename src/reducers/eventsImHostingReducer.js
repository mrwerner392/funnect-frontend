export default (state = {events: []}, action) => {
  switch (action.type) {
    case 'SET_EVENTS_HOSTING':
      return {
        ...state,
        events: action.events
      }
    default:
      return state
  }
}
