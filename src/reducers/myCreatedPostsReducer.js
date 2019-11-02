export default (state = {posts: [], filter: 'active'}, action) => {
  switch (action.type) {
    case 'SET_CREATED_POSTS':
      return {
        ...state,
        posts: action.posts
      }
    case 'SET_CREATED_POSTS_FILTER':
      console.log('reducer hit');
      return {
        ...state,
        filter: action.filter
      }
    default:
      return state
  }
}
