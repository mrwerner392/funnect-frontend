export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_EVENT':
      return {
        ...action.event
      }
    default:
      return state
  }
}
