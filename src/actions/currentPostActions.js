const URL = 'http://localhost:3000'

export const setCurrentPost = post => dispatch => {
  dispatch({ type: 'SET_CURRENT_POST', post })
}

export const getCurrentPost = id => dispatch => {
  const config = {
    headers: {
      'Authorization': localStorage.token
    }
  }

  fetch(URL + `/posts/${id}`, config)
  .then(res => res.json())
  .then(post => dispatch(setCurrentPost(post)))
}

export const addNewInterestedUserCurrentPost = post => dispatch => {
  dispatch({ type: 'ADD_NEW_INTERESTED_USER_CURRENT_POST' })
}
