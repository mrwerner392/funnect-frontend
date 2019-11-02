const URL = 'http://localhost:3000'

const setInterests = interests => {
  return {
    type: 'SET_INTERESTS',
    interests
  }
}

export const getInterests = () => dispatch => {
  const config = {
    headers: {
      'Authorization': localStorage.token
    }
  }

  fetch(URL + '/interests', config)
  .then(res => res.json())
  .then(interests => dispatch(setInterests(interests)))
}
