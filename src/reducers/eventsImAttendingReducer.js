export default (state = {events: [], newEventExists: false, newMessagesExist: false, filter: 'active'}, action) => {
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
    case 'NEW_EVENT_ATTENDING':
      console.log('reducer');
      return {
        ...state,
        events: [
          action.event,
          ...state.events
        ],
        newEventExists: true
      }
    case 'NEW_EVENT_ATTENDING_SEEN':
      return {
        ...state,
        newEventExists: false
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
    case 'TOGGLE_EVENTS_ATTENDING_NEW_MESSAGES_EXIST':
      return {
        ...state,
        newMessagesExist: !state.newMessagesExist
      }
    default:
      return state
  }
}
