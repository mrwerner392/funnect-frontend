export default (state = {posts: [], filter: 'active'}, action) => {
  switch (action.type) {
    case 'SET_CREATED_POSTS':
      return {
        ...state,
        posts: action.posts
      }
    case 'ADD_CREATED_POST':
      return {
        ...state,
        posts: [
          ...state.posts,
          action.post
        ]
      }
    case 'CLEAR_CREATED_POSTS':
      return {
        ...state,
        posts: [],
        filter: 'active'
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
