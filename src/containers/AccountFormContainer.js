import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import AccountForm from '../components/AccountForm';
import { loginRequest, createUserRequest } from '../actions/userActions';
class FormContainer extends Component {

  render() {
    const { loginRequest, createUserRequest, formType } = this.props

    return (
      <div>
        <AccountForm loginRequest={ loginRequest }
                      createUserRequest={ createUserRequest }
                      formType={ formType }
                      />
        { formType === 'login'
          ? <p>Or <span><NavLink exact to='/create-profile'>Create a Profile</NavLink></span></p>
          : <p>Or <span><NavLink exact to='/login'>Log In</NavLink></span></p> }
      </div>
    )
  }

}

const mapDispatchToProps = {
  loginRequest,
  createUserRequest
}

export default connect(null, mapDispatchToProps)(FormContainer)
