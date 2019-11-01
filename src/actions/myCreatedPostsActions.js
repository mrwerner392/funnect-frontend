const URL = 'http://localhost:3000'

const setPosts = posts => {
  return {
    type: 'SET_CREATED_POSTS',
    posts
  }
}

export const getCreatedPosts = () => dispatch => {
  const config = {
    headers: {
      'Authorization': localStorage.token
    }
  }
  console.log('fetch to created');
  fetch(URL + `/users/${localStorage.id}/created_posts`, config)
  .then(res => res.json())
  .then(posts => dispatch(setPosts(posts)))
  // .then(console.log)

}
