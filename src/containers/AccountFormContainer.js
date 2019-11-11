import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AccountForm from '../components/AccountForm';
import { setUser } from '../actions/userActions';
import { getAvailablePosts } from '../actions/availablePostsActions';
import { getCreatedPosts } from '../actions/myCreatedPostsActions';
import { getPostsInterestedIn } from '../actions/postsImInterestedInActions'
import { getEventsHosting } from '../actions/eventsImHostingActions'
import { getEventsAttending } from '../actions/eventsImAttendingActions'
import { getTopics } from '../actions/topicsActions';
import { getNeighborhoods } from '../actions/neighborhoodsActions';
import { setContentType } from '../actions/contentTypeActions';

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
            getEventsAttending,
            getTopics,
            getNeighborhoods,
            setContentType,
            history } = this.props

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
        getTopics()
        getNeighborhoods()
        setContentType('posts')
        history.push('/posts')
      }
    })
  }

  handleCreateUserRequest = (user) => {
    const { setUser,
            getAvailablePosts,
            getTopics,
            getNeighborhoods,
            history } = this.props

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
        getAvailablePosts()
        getTopics()
        getNeighborhoods()
        setContentType('posts')
        history.push('/posts')
      }
    })
  }

  render() {
    const { state: { errors }, props: { formType }, handleLoginRequest, handleCreateUserRequest } = this

    return (
      <div className='account-form-container'>
        <AccountForm handleLoginRequest={ handleLoginRequest }
                      handleCreateUserRequest={ handleCreateUserRequest }
                      formType={ formType }
                      errors={ errors }
                      />
        { formType === 'login'
          ? <p className='acct-form-footer'>
              { 'Or ' }
                <span>
                  <NavLink className='link'
                            exact
                            to='/create-profile'
                            >
                            Create a Profile
                  </NavLink>
                </span>
            </p>
          : <p className='acct-form-footer'>
              { 'Or ' }
                <span>
                  <NavLink className='link'
                            exact
                            to='/login'
                            >
                    Log In
                  </NavLink>
                </span>
            </p> }
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
  getEventsAttending,
  getTopics,
  getNeighborhoods,
  setContentType
}

export default withRouter(connect(null, mapDispatchToProps)(FormContainer))
