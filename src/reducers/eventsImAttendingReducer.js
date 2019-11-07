export default (state = {events: [], filter: 'active'}, action) => {
  switch (action.type) {
    case 'SET_EVENTS_ATTENDING':
      return {
        ...state,
        events: action.events
      }
    case 'CLEAR_EVENTS_ATTENDING':
      return {
        ...state,
        events: [],
        filter: 'active'
      }
    case 'SET_EVENTS_ATTENDING_FILTER':
      return {
        ...state,
        filter: action.filter
      }
    case 'ADD_EVENT_ATTENDING_MESSAGE':
      return {
        ...state,
        events: state.events.map(event => {
          if (event.id === action.eventId) {
            return {
              ...event,
              messages: [...event.messages, action.message]
            }
          } else {
            return event
          }
        })
      }
    default:
      return state
  }
}
