import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { clearUser } from '../actions/userActions'

class NavBar extends Component {

  handleLogout = () => {
    const { clearUser } = this.props
    localStorage.clear();
    clearUser();
  }

  render() {
    const { props: {user: {username}}, handleLogout } = this
    return (
      <div>
        <NavLink exact to={ username ? '/posts' : '/login' } >MatChat</NavLink>
        { username
          ?
          <Fragment>
            <NavLink exact to={ `/${username}` } >{ username }</NavLink>
            <NavLink exact to='/posts' >Home</NavLink>
            <NavLink exact to='/create-post' >New Post</NavLink>
            <NavLink exact to='/login' onClick={ handleLogout } >Log Out</NavLink>
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
    clearUser: () => dispatch(clearUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
