export default (state = {events: []}, action) => {
  switch (action.type) {
    case 'SET_EVENTS_ATTENDING':
      return {
        ...state,
        events: action.events
      }
    case 'SET_EVENTS_ATTENDING_FILTER':
      return {
        ...state,
        filter: action.filter
      }
    default:
      return state
  }
}
