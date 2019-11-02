export default (state = {posts: []}, action) => {
  switch (action.type) {
    case 'SET_CREATED_POSTS':
      return {
        ...state,
        posts: action.posts
      }
    case 'SET_CREATED_POSTS_FILTER':
      return {
        ...state,
        filter: action.filter
      }
    default:
      return state
  }
}
