export default (state = {posts: []}, action) => {
  switch (action.type) {
    case 'SET_POSTS_INTERESTED_IN':
      return {
        ...state,
        posts: action.posts
      }
  default:
    return state
  }
}
