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
      console.log('reducing');
      return {
        ...state,
        posts: state.posts.map(post => {
                 if (post.id === action.post.id) {
                   const newInterestedUsers = post.newInterestedUsers ? [...post.newInterestedUsers] : []
                   const newUser = action.post.interested_users[action.post.interested_users.length - 1]
                   console.log(newInterestedUsers, newUser);
                   return {
                     ...post,
                     newInterestedUsers: [
                       ...newInterestedUsers,
                       newUser
                     ]
                   }
                 } else {
                   return post
                 }
               })
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
