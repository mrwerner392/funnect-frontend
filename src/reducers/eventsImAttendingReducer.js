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
    case 'ADD_EVENT_ATTENDING_MESSAGE':
      console.log('here');
      return {
        ...state,
        events: state.events.map(event => {
          if (event.id === action.message.event_id) {
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
