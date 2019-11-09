const URL = 'http://localhost:3000'

export const setUser = user => dispatch => {
  dispatch({
    type: 'SET_USER',
    user
  })
}

export const clearUser = () => dispatch => {
  dispatch({ type: 'CLEAR_USER' })
}

export const getUser = () => dispatch => {
  const config = {
    headers: {
      'Authorization': localStorage.token
    }
  }

  fetch(URL + `/users/${localStorage.id}`, config)
  .then(res => res.json())
  .then(user => dispatch(setUser(user)))

}

export const toggleHasNewInfo = () => dispatch => {
  dispatch({ type: 'TOGGLE_HAS_NEW_INFO' })
}
