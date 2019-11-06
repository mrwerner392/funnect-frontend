export default (state = {posts: [], topicFilter: '', neighborhoodFilter: ''}, action) => {
  switch (action.type) {
    case 'SET_AVAILABLE_POSTS':
      return {
        ...state,
        posts: action.posts
      }
    case 'ADD_AVAILABLE_POST':
      return {
        ...state,
        posts: [
          ...state.posts,
          {...action.post,
            interested_users: action.post.interested_users.filter(user => user.id !== action.userId)
          }
        ]
      }
    case 'REMOVE_AVAILABLE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.id)
      }
    case 'CLEAR_AVAILABLE_POSTS':
      return {
        ...state,
        posts: {},
        topicFilter: '',
        neighborhoodFilter: ''
      }
    case 'SET_AVAILABLE_POSTS_TOPIC_FILTER':
      return {
        ...state,
        topicFilter: action.filter
      }
    case 'SET_AVAILABLE_POSTS_NEIGHBORHOOD_FILTER':
      return {
        ...state,
        neighborhoodFilter: action.filter
      }
    default:
      return state
  }
}
