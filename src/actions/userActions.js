const URL = 'http://localhost:3000'

export const setUser = user => dispatch => {
  dispatch({
    type: 'SET_USER',
    user
  })
}

// export const loginRequest = user => dispatch => {
//   const config = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify(user)
//   }
//
//   fetch(URL + '/login', config)
//   .then(res => res.json())
//   .then(({token, user}) => {
//     localStorage.token = token
//     localStorage.id = user.id
//     dispatch(setUser(user))
//   })
// }

// export const createUserRequest = user => dispatch => {
//   const config = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify(user)
//   }
//
//   fetch(URL + '/users', config)
//   .then(res => res.json())
//   .then(({token, user}) => {
//     localStorage.token = token
//     localStorage.id = user.id
//     dispatch(setUser(user))
//   })
// }

export const getUser = user => dispatch => {
  const config = {
    headers: {
      'Authorization': localStorage.token
    }
  }

  fetch(URL + `/users/${localStorage.id}`, config)
  .then(res => res.json())
  .then(user => dispatch(setUser(user)))

}
