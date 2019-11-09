export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.user,
        hasNewInfo: false
      }
    case 'CLEAR_USER':
      return {}
    case 'TOGGLE_HAS_NEW_INFO':
      return {
        ...state,
        hasNewInfo: !state.hasNewInfo
      }
    default:
      return state
  }
}
