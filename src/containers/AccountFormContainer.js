import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import AccountForm from '../components/AccountForm';
import { loginRequest, createUserRequest, setUser } from '../actions/userActions';

const URL = 'http://localhost:3000'

class FormContainer extends Component {

  handleLoginRequest = ({ username, password }) => {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ username, password })
    }

    fetch(URL + '/login', config)
    .then(res => res.json())
    .then(({token, user}) => {
      localStorage.token = token
      localStorage.id = user.id
      setUser(user)
      // getAllPosts()
    })
  }

  render() {
    const { handleLoginRequest, props:{createUserRequest, formType} } = this

    return (
      <div id='account-form-container'>
        <AccountForm handleLoginRequest={ handleLoginRequest }
                      createUserRequest={ createUserRequest }
                      setUser={ setUser }
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
  setUser
}

export default connect(null, mapDispatchToProps)(FormContainer)
