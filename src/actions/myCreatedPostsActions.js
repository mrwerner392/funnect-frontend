const URL = 'http://localhost:3000'

const setPosts = posts => {
  return {
    type: 'SET_CREATED_POSTS',
    posts
  }
}

const addPost = post => {
  return {
    type: 'ADD_CREATED_POST',
    post
  }
}

export const getCreatedPosts = () => dispatch => {
  const config = {
    headers: {
      'Authorization': localStorage.token
    }
  }

  fetch(URL + `/users/${localStorage.id}/created_posts`, config)
  .then(res => res.json())
  .then(posts => dispatch(setPosts(posts)))

}

export const createNewPost = postInfo => dispatch => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': localStorage.token
    },
    body: JSON.stringify(postInfo)
  }

  fetch(URL + '/posts', config)
  .then(res => res.json())
  .then(console.log)
}

export const setCreatedPostsFilter = filter => dispatch => {
  dispatch({ type: 'SET_CREATED_POSTS_FILTER', filter })
}
