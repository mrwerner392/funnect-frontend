export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_TOPICS':
      return {
        ...state,
        topics: action.topics
      }
    default:
      return state
  }
}
