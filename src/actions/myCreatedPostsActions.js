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

export const clearCreatedPosts = () => dispatch => {
  dispatch({ type: 'CLEAR_CREATED_POSTS' })
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

export const addCreatedPost = post => dispatch => {
  dispatch(addPost(post))
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
  // .then(res => res.json())
  // .then(post => dispatch(addPost(post)))
}

export const addNewInterestedUser = (post, user) => dispatch => {
  dispatch({ type: 'ADD_NEW_INTERESTED_USER', post, user })
}

export const clearNewInterestedUsers = postId => dispatch => {
  dispatch({ type: 'CLEAR_NEW_INTERESTED_USERS', postId })
}

export const toggleNewInterestedUsersExist = () => dispatch => {
  dispatch({ type: 'TOGGLE_NEW_INTERESTED_USERS_EXIST' })
}

export const setCreatedPostsFilter = filter => dispatch => {
  dispatch({ type: 'SET_CREATED_POSTS_FILTER', filter })
}
