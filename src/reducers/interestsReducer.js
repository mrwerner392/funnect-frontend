export default (state = [], action) => {
  switch (action.type) {
    case 'SET_INTERESTS':
      return [
        ...state,
        ...action.interests
      ]
    default:
      return state
  }
}
