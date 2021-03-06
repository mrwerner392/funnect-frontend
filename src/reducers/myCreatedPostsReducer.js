export default (state = {posts: [], newInterestedUsersExist: false, filter: 'active'}, action) => {
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
          action.post,
          ...state.posts
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
        posts: state.posts.map(post => {
                 if (post.id === action.post.id) {
                   const newInterestedUsers = post.newInterestedUsers ? [...post.newInterestedUsers] : []
                   return {
                     ...post,
                     newInterestedUsers: [
                       ...newInterestedUsers,
                       action.user
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
        posts: state.posts.map(post => {
                 if (post.id === action.postId) {
                   return {
                     ...post,
                     interested_users: [
                       ...post.interested_users,
                       ...post.newInterestedUsers
                     ],
                     newInterestedUsers: []
                   }
                 } else {
                   return post
                 }
               })
      }
    case 'TOGGLE_NEW_INTERESTED_USERS_EXIST':
      return {
        ...state,
        newInterestedUsersExist: !state.newInterestedUsersExist
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
