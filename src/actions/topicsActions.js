const URL = 'http://localhost:3000';

const setTopics = topics => {
  return {
    type: 'SET_TOPICS',
    topics
  }
}

export const clearTopics = () => dispatch => {
  dispatch({ type: 'CLEAR_TOPICS' })
}

export const getTopics = () => dispatch => {
  const config = {
    headers: {
      'Authorization': localStorage.token
    }
  }

  fetch(URL + '/topics', config)
  .then(res => res.json())
  .then(topics => dispatch(setTopics(topics)))
}
