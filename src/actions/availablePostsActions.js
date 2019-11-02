const URL = 'http://localhost:3000';

const setPosts = posts => {
  return {
    type: 'SET_AVAILABLE_POSTS',
    posts
  }
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

export const setAvailablePostsFilter = filter => dispatch => {
  dispatch({ type: 'SET_AVAILABLE_POSTS_FILTER', filter })
}
