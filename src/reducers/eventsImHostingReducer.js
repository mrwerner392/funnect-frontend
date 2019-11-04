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
    case 'ADD_EVENT_HOSTING_MESSAGE':
      console.log(action);
      return {
        ...state,
        events: state.events.map(event => {
          if (event.id === action.eventId) {
            console.log(state.events);
            console.log(event);
            return {
              ...event,
              messages: [...event.messages, action.message]
            }
          } else {
            return event
          }
        })
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
