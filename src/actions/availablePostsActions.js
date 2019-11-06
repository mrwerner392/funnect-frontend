const URL = 'http://localhost:3000';

const setPosts = posts => {
  return {
    type: 'SET_AVAILABLE_POSTS',
    posts
  }
}

export const clearAvailablePosts = () => dispatch => {
  dispatch({ type: 'CLEAR_AVAILABLE_POSTS' })
}

export const getAvailablePosts = () => dispatch => {
  const config = {
    headers: {
      'Authorization': localStorage.token
    }
  }

  fetch(URL + `/users/${localStorage.id}/available_posts`, config)
  .then(res => res.json())
  .then(posts => dispatch(setPosts(posts)))
}

export const addAvailablePost = (post, userId) => dispatch => {
  dispatch({ type: 'ADD_AVAILABLE_POST', post, userId })
}

export const removeAvailablePost = id => dispatch => {
  dispatch({ type: 'REMOVE_AVAILABLE_POST', id })
}

export const setAvailablePostsTopicFilter = filter => dispatch => {
  dispatch({ type: 'SET_AVAILABLE_POSTS_TOPIC_FILTER', filter })
}

export const setAvailablePostsNeighborhoodFilter = filter => dispatch => {
  dispatch({ type: 'SET_AVAILABLE_POSTS_NEIGHBORHOOD_FILTER', filter })
}
