export default (state = {posts: [], filter: 'active'}, action) => {
  switch (action.type) {
    case 'SET_POSTS_INTERESTED_IN':
      return {
        ...state,
        posts: action.posts
      }
    case 'ADD_POST_INTERESTED_IN':
      return {
        ...state,
        posts: [
          ...state.posts,
          action.post
        ]
      }
    case 'SET_POSTS_INTERESTED_IN_FILTER':
      return {
        ...state,
        filter: action.filter
      }
    default:
      return state
  }
}
