export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_EVENT':
      return {
        ...action.event
      }
    case 'ADD_CURRENT_EVENT_MESSAGE':
      console.log('reducing', action);
      return {
        ...state,
        messages: [
          ...state.messages,
          action.message
        ]
      }
    default:
      return state
  }
}
