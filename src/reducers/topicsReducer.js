export default (state = [], action) => {
  switch (action.type) {
    case 'SET_TOPICS':
      return action.topics
    case 'CLEAR_TOPICS':
      return []
    default:
      return state
  }
}
