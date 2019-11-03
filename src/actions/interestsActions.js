const URL = 'http://localhost:3000'

const setInterests = interests => {
  return {
    type: 'SET_INTERESTS',
    interests
  }
}

export const getInterests = () => dispatch => {
  fetch(URL + '/interests')
  .then(res => res.json())
  .then(interests => dispatch(setInterests(interests)))
}
