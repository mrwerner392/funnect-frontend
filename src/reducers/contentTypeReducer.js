export default (state = '', action) => {
  switch (action.type) {
    case 'SET_CONTENT_TYPE':
      return action.contentType
    case 'CLEAR_CONTENT_TYPE':
      return ''
    default:
      return state
  }
}
