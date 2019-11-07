export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_POST':
      return {
        ...action.post
      }
    default:
      return state
  }
}
