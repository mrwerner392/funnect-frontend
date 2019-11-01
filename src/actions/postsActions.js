const URL = 'http://localhost:3000';

const setPosts = posts => {
  return {
    type: 'SET_POSTS',
    posts
  }
}

export const getAllPosts = () => dispatch => {
  const config = {
    headers: {
      'Authorization': localStorage.token
    }
  }

  fetch(URL + '/posts', config)
  .then(res => res.json())
  .then(posts => dispatch(setPosts(posts)))
}
