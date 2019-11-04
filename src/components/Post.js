import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Post extends Component {

  renderUserInterests = interests => {
    const interestNames = interests.map(interest => interest.name)
    return interestNames.join(', ')
  }

  renderPostFooter = () => {
    const { post, user } = this.props
    const interestedIds = post.interested_users.map(user => user.id)

    if (post.user.id === user.id) {
      return (
        <p>{ interestedIds.length } users are interested <span><NavLink exact to={ `/${user.username}/posts/${post.id}` }>Manage Post</NavLink></span></p>
      )
    } else if (interestedIds.includes(user.id)) {

    } else {

    }
  }

  render() {
    const { props: {post, user}, renderUserInterests, renderPostFooter } = this
    console.log(post.user);
    return (
      <div className='Post'>
        <p>{ post.topic.name }</p>
        <p>{ post.neighborhood.name }</p>
        <p>{ post.time_of_day }</p>
        <p>{ post.description }</p>
        <h4>Poster:</h4>
        <p>{ `${post.user.username}, ${post.user.age}, ${post.user.occupation}` }</p>
        <p>{ `"${post.user.bio}"` }</p>
        <p>Likes: { renderUserInterests(post.user.interests) }</p>
        { renderPostFooter() }
        {/*
          post.user.id === user.id
          ? <NavLink exact to={ `/${user.username}/posts/${post.id}` }>Manage Post</NavLink>
          : null
        */}
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
