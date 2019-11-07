const URL = 'http://localhost:3000'

const setNeighborhoods = neighborhoods => {
  return {
    type: 'SET_NEIGHBORHOODS',
    neighborhoods
  }
}

export const clearNeighborhoods = () => dispatch => {
  dispatch({ type: 'CLEAR_NEIGHBORHOODS' })
}

export const getNeighborhoods = () => dispatch => {
  const config = {
    headers: {
      'Authorization': localStorage.token
    }
  }

  fetch(URL + '/neighborhoods', config)
  .then(res => res.json())
  .then(neighborhoods => dispatch(setNeighborhoods(neighborhoods)))
}
