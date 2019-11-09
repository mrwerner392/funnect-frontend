export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_POST':
      return action.post.newInterestedUsers
                  ?
                    {
                      ...action.post,
                      interested_users: [
                        ...action.post.interested_users,
                        ...action.post.newInterestedUsers
                      ],
                      newInterestedUsers: []
                    }
                  :
                    {
                      ...action.post
                    }
    case 'ADD_NEW_INTERESTED_USER_CURRENT_POST':
      return {
        ...state,
        interested_users: action.post.interested_users
      }
    default:
      return state
  }
}
