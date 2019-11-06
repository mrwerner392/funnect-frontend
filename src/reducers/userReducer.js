export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
    console.log(state);
    console.log(action.user);
    console.log({
      ...state,
      ...action.user
    });
      return {
        ...state,
        ...action.user
      }
    case 'CLEAR_USER':
      return {}
    default:
      return state
  }
}
