export default (state = {posts: [], filter: ''}, action) => {
  switch (action.type) {
    case 'SET_AVAILABLE_POSTS':
      return {
        ...state,
        posts: action.posts
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
