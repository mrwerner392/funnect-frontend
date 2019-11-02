export default (state = {posts: []}, action) => {
  switch (action.type) {
    case 'SET_CREATED_POSTS':
      return {
        ...state,
        posts: action.posts
      }
    default:
      return state
  }
}
