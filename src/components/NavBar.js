import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { clearUser } from '../actions/userActions'
import { clearAvailablePosts } from '../actions/availablePostsActions'
import { clearPostsInterestedIn } from '../actions/postsImInterestedInActions'
import { clearCreatedPosts } from '../actions/myCreatedPostsActions'
import { clearEventsHosting } from '../actions/eventsImHostingActions'

class NavBar extends Component {

  handleLogout = () => {
    const { clearUser,
            clearAvailablePosts,
            clearPostsInterestedIn,
            clearCreatedPosts,
            clearEventsHosting } = this.props
    localStorage.clear();
    clearUser();
    clearAvailablePosts();
    clearPostsInterestedIn();
    clearCreatedPosts();
    clearEventsHosting();
  }

  render() {
    const { props: {user: {username}}, handleLogout } = this
    return (
      <div>
        <NavLink className='nav' exact to={ username ? '/posts' : '/login' } >MatChat</NavLink>
        { username
          ?
          <Fragment>
            <NavLink className='nav' exact to={ `/${username}` } >{ username }</NavLink>
            <NavLink className='nav' exact to='/posts' >Home</NavLink>
            <NavLink className='nav' exact to='/create-post' >New Post</NavLink>
            <NavLink className='nav' exact to='/login' onClick={ handleLogout } >Log Out</NavLink>
          </Fragment>
          :
          null
        }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearUser: () => dispatch(clearUser()),
    clearAvailablePosts: () => dispatch(clearAvailablePosts()),
    clearPostsInterestedIn: () => dispatch(clearPostsInterestedIn()),
    clearCreatedPosts: () => dispatch(clearCreatedPosts()),
    clearEventsHosting: () => dispatch(clearEventsHosting())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
