export const setCurrentPost = post => dispatch => {
  dispatch({ type: 'SET_CURRENT_POST', post })
}
