export default (state = [], action) => {
  switch (action.type) {
    case 'SET_NEIGHBORHOODS':
      return action.neighborhoods
    case 'CLEAR_NEIGHBORHOODS':
      return []
    default:
      return state
  }
}
