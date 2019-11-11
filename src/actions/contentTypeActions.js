export const setContentType = contentType => dispatch => {
  dispatch({ type: 'SET_CONTENT_TYPE', contentType })
}

export const clearContentType = () => dispatch => {
  dispatch ({ type: 'CLEAR_CONTENT_TYPE' })
}
