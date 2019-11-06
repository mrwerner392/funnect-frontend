export default (state = '', action) => {
  switch (action.type) {
    case 'SET_CONTENT_TYPE':
      return action.contentType
    default:
      return state
  }
}
