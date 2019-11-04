import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Post extends Component {

  render() {
    const { post, user } = this.props
    return (
      <div className='Post'>
        <p>{ post.topic.name }</p>
        <p>{ post.neighborhood.name }</p>
        <p>{ post.user.username }</p>
        {
          post.user.id === user.id
          ? <NavLink exact to={ `/${user.username}/posts/${post.id}` }>Manage Post</NavLink>
          : null
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

export default connect(mapStateToProps)(Post)
