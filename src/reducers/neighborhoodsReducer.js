export default (state = [], action) => {
  switch (action.type) {
    case 'SET_NEIGHBORHOODS':
      return [
        ...state,
        action.neighborhoods
      ]
    default:
      return state
  }
}
