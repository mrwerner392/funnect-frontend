const URL = 'http://localhost:3000'

const setPosts = posts => {
  return {
    type: 'SET_POSTS_INTERESTED_IN',
    posts
  }
}

const addPost = post => {
  return {
    type: 'ADD_POST_INTERESTED_IN',
    post
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

export const addPostInterestedIn = (post_id, user_id) => dispatch => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': localStorage.token
    },
    body: JSON.stringify({
      post_id,
      user_id
    })
  }

  fetch(URL + '/post_interests', config)
  .then(res => res.json())
  .then(post => dispatch(addPost(post)))
  // dispatch({ type: 'ADD_POST_INTERESTED_IN', post })
}

export const removePostInterestedIn = id => dispatch => {
  dispatch({ type: 'REMOVE_POST_INTERESTED_IN', id })
}

export const setPostsInterestedInFilter = filter => dispatch => {
  dispatch({ type: 'SET_POSTS_INTERESTED_IN_FILTER', filter })
}
