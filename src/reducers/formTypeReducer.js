export default (state = 'login', action) => {
  switch (action.type) {
    case 'TOGGLE_ACCOUNT_FORM':
      return {
        ...state,
        formType: action.formType
      }
    default:
      return state
  }
}
