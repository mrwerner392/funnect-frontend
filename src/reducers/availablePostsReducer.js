export default (state = {posts: [], postsWaiting: 0, topicFilter: '', neighborhoodFilter: ''}, action) => {
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
    case 'ADD_NEW_AVAILABLE_POST_FROM_WS':
      return {
        ...state,
        posts: [
          ...state.posts,
          action.post
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
        posts: [],
        postsWaiting: 0,
        topicFilter: '',
        neighborhoodFilter: ''
      }
    case 'ADD_POST_WAITING':
      return {
        ...state,
        postsWaiting: state.postsWaiting + 1
      }
    case 'CLEAR_POSTS_WAITING':
      return {
        ...state,
        postsWaiting: 0
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
