import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Post extends Component {

  renderUserInterests = interests => {
    const interestNames = interests.map(interest => interest.name)
    return interestNames.join(', ')
  }

  render() {
    const { props: {post, user}, renderUserInterests } = this
    console.log(post.user);
    return (
      <div className='Post'>
        <p>{ post.topic.name }</p>
        <p>{ post.neighborhood.name }</p>
        <p>{ post.time_of_day }</p>
        <h6>Poster:</h6>
        <p>{ `${post.user.username}, ${post.user.age}, ${post.user.occupation}` }</p>
        <p>{ `"${post.user.bio}"` }</p>
        <p>Likes: { renderUserInterests(post.user.interests) }</p>
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
