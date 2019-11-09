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
    default:
      return state
  }
}
