import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import AccountForm from '../components/AccountForm';
import { setUser } from '../actions/userActions';
import { getAvailablePosts } from '../actions/availablePostsActions';
import { getCreatedPosts } from '../actions/myCreatedPostsActions';
import { getPostsInterestedIn } from '../actions/postsImInterestedInActions'
import { getEventsHosting } from '../actions/eventsImHostingActions'
import { getEventsAttending } from '../actions/eventsImAttendingActions'

const URL = 'http://localhost:3000'

class FormContainer extends Component {

  state = {
    errors: null
  }

  handleLoginRequest = ({ username, password }) => {
    const { setUser,
            getAvailablePosts,
            getCreatedPosts,
            getPostsInterestedIn,
            getEventsHosting,
            getEventsAttending } = this.props
            
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
    .then(responseData => {
      if (responseData.errors) {
        this.setState({
          errors: responseData.errors
        })
      } else {
        localStorage.token = responseData.token
        localStorage.id = responseData.user.id
        setUser(responseData.user)
        getAvailablePosts()
        getCreatedPosts()
        getPostsInterestedIn()
        getEventsHosting()
        getEventsAttending()
      }
    })
  }

  handleCreateUserRequest = (user) => {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user)
    }

    fetch(URL + '/users', config)
    .then(res => res.json())
    .then(responseData => {
      if (responseData.errors) {
        this.setState({
          errors: responseData.errors
        })
      } else {
        localStorage.token = responseData.token
        localStorage.id = responseData.user.id
        setUser(responseData.user)

      }
    })
  }

  render() {
    const { state: { errors }, props: { formType }, handleLoginRequest, handleCreateUserRequest } = this

    return (
      <div id='account-form-container'>
        <AccountForm handleLoginRequest={ handleLoginRequest }
                      handleCreateUserRequest={ handleCreateUserRequest }
                      formType={ formType }
                      errors={ errors }
                      />
        { formType === 'login'
          ? <p>Or <span><NavLink exact to='/create-profile'>Create a Profile</NavLink></span></p>
          : <p>Or <span><NavLink exact to='/login'>Log In</NavLink></span></p> }
      </div>
    )
  }

}

const mapDispatchToProps = {
  setUser,
  getAvailablePosts,
  getCreatedPosts,
  getPostsInterestedIn,
  getEventsHosting,
  getEventsAttending
}

export default connect(null, mapDispatchToProps)(FormContainer)
