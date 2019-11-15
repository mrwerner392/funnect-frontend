export default (state = {events: [], newMessagesExist: false, filter: 'active'}, action) => {
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
    case 'UPDATE_EVENT_HOSTING':
      return {
        ...state,
        events: state.events.map(event => event.id === action.event.id ? action.event : event)
      }
    case 'CLEAR_EVENTS_HOSTING':
      return {
        ...state,
        events: [],
        filter: 'active'
      }
    case 'ADD_EVENT_HOSTING_MESSAGE':
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
    case 'TOGGLE_EVENTS_HOSTING_NEW_MESSAGES_EXIST':
      return {
        ...state,
        newMessagesExist: !state.newMessagesExist
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
