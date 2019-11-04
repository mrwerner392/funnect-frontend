import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {

  render() {
    const { username } = this.props.user
    return (
      <div>
        <NavLink exact to={ `/${username}` } >{ username }</NavLink>
        <NavLink exact to='/posts'>Home</NavLink>
        <NavLink exact to='/create-post'>New Post</NavLink>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(NavBar)
