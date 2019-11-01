export default (state = [], action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return [
        ...state,
        ...action.posts
      ]
    default:
      return state
  }
}
