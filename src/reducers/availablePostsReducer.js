export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_AVAILABLE_POSTS':
      return {
        ...state,
        posts: action.posts
      }
    default:
      return state
  }
}
