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
  console.log('fetching interested posts');
  fetch(URL + `/users/${localStorage.id}/posts_interested_in`, config)
  .then(res => res.json())
  .then(posts => dispatch(setPosts(posts)))
}
