const URL = 'http://localhost:3000'

const setPosts = posts => {
  return {
    type: 'SET_POSTS_INTERESTED_IN',
    posts
  }
}

export const getPostsInterestedIn = () => dispatch => {
  const config = {
    headers: {
      'Authorization': localStorage.token
    }
  }

  fetch(URL + `/users/${localStorage.id}/posts_interested_in`, config)
  .then(res => res.json())
  .then(posts => dispatch(setPosts(posts)))
}

export const addPostInterestedIn = post => dispatch => {
  dispatch({ type: 'ADD_POST_INTERESTED_IN', post })
}

export const setPostsInterestedInFilter = filter => dispatch => {
  dispatch({ type: 'SET_POSTS_INTERESTED_IN_FILTER', filter })
}
