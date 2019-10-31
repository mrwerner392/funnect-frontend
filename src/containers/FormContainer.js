import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import AccountForm from '../components/AccountForm';
import { userLoginRequest } from '../actions/userActions';
class FormContainer extends Component {

  render() {
    const { props: {userLoginRequest, userCreateProfileRequest, formType},
            renderAccountForm,
            renderPostForm } = this

    return (
      <div>
        <AccountForm userLoginRequest={ userLoginRequest }
                      userCreateProfileRequest={ null }
                      formType={ formType }
                      />
        {formType === 'login'
          ? <p>Or <span><NavLink exact to='/create-profile'>Create a Profile</NavLink></span></p>
          : <p>Or <span><NavLink exact to='/login'>Log In</NavLink></span></p> }
      </div>
    )
  }

}

const mapDispatchToProps = {
  userLoginRequest
}

export default connect(null, mapDispatchToProps)(FormContainer)
