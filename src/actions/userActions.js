const URL = 'http://localhost:3000'

const userLogin = user => {
  return {
    type: 'SET_USER',
    user
  }
}

export const userLoginRequest = user => dispatch => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(user)
  }

  fetch(URL + '/login', config)
  .then(res => res.json())
  .then(({token, user}) => {
    localStorage.token = token
    localStorage.id = user.id
    dispatch(userLogin(user))
  })
}
