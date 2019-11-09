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
    case 'ADD_NEW_INTERESTED_USER':
      return {
        ...state,
        posts: [
          state.posts.map(post => {
            if (post.id === action.post.id) {
              const newInterestedUsers = [...post.newInterestedUsers] || []
              return {
                ...post,
                newInterestedUsers:
                    newInterestedUsers.push(action.post.interested_users.last)
              }
            } else {
              return post
            }
          })
        ]
      }
    case 'CLEAR_NEW_INTERESTED_USERS':
      return {
        ...state,
        posts: [
          state.posts.map(post => {
            if (post.id === action.postId) {
              return {
                ...post,
                NewInterestedUsers: 0
              }
            } else {
              return post
            }
          })
        ]
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
