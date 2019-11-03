export default (state = {events: [], filter: 'active'}, action) => {
  switch (action.type) {
    case 'SET_EVENTS_HOSTING':
      return {
        ...state,
        events: action.events
      }
    case 'ADD_EVENT_HOSTING':
      return {
        ...state,
        events: [
          ...state.events, action.event 
        ]
      }
    case 'SET_EVENTS_HOSTING_FILTER':
      return {
        ...state,
        filter: action.filter
      }
    default:
      return state
  }
}
