import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addAvailablePost } from '../actions/availablePostsActions';
import { addPostInterestedIn } from '../actions/postsImInterestedInActions';
import { removeAvailablePost } from '../actions/availablePostsActions';
import { removePostInterestedIn } from '../actions/postsImInterestedInActions';

class Post extends Component {

  handleInterestedClick = post => {
    const { user, addPostInterestedIn, removeAvailablePost } = this.props
    addPostInterestedIn(post.id, user.id)
    removeAvailablePost(post.id)
  }

  handleNotInterestedClick = post => {
    const { addAvailablePost, removePostInterestedIn } = this.props
    addAvailablePost(post)
    removePostInterestedIn(post.id)
  }

  renderUserInterests = interests => {
    const interestNames = interests.map(interest => interest.name)
    return interestNames.join(', ')
  }

  renderPostFooter = () => {
    const { props: {post, user},
            handleInterestedClick,
            handleNotInterestedClick } = this
    const interestedIds = post.interested_users.map(user => user.id)

    if (post.user.id === user.id) {
      return (
        <p>{ interestedIds.length } users are interested <span><NavLink exact to={ `/${user.username}/posts/${post.id}` }>Manage Post</NavLink></span></p>
      )
    } else if (interestedIds.includes(user.id)) {
      return (
        <p>You and { interestedIds.length - 1 } are interested<span><button onClick={ () => handleNotInterestedClick(post) }>{ "I'm Not Interested" }</button></span></p>
      )
    } else {
      return (
        <p>{ interestedIds.length } users are interested <span><button onClick={ () => handleInterestedClick(post) }>{ "I'm Interested" }</button></span></p>
      )
    }
  }

  render() {
    const { props: {post, user}, renderUserInterests, renderPostFooter } = this
    console.log(post.user);
    return (
      <div className='post'>
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

const mapDispatchToProps = {
  addAvailablePost,
  addPostInterestedIn,
  removeAvailablePost,
  removePostInterestedIn
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
