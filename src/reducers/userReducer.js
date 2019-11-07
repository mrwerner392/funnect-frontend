export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.user
      }
    case 'CLEAR_USER':
      return {}
    default:
      return state
  }
}
