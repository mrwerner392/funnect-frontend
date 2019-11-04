export default (state = {posts: [], topicFilter: '', neighborhoodFilter: ''}, action) => {
  switch (action.type) {
    case 'SET_AVAILABLE_POSTS':
      return {
        ...state,
        posts: action.posts
      }
    case 'REMOVE_AVAILABLE_POST':
      console.log('reducer');
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.id)
      }
    case 'SET_AVAILABLE_POSTS_TOPIC_FILTER':
      console.log('topic');
      return {
        ...state,
        topicFilter: action.filter
      }
    case 'SET_AVAILABLE_POSTS_NEIGHBORHOOD_FILTER':
      console.log('neighborhood');
      return {
        ...state,
        neighborhoodFilter: action.filter
      }
    default:
      return state
  }
}
