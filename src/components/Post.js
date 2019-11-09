import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addAvailablePost } from '../actions/availablePostsActions';
import { addPostInterestedIn } from '../actions/postsImInterestedInActions';
import { removeAvailablePost } from '../actions/availablePostsActions';
import { removePostInterestedIn } from '../actions/postsImInterestedInActions';
import { setCurrentPost } from '../actions/currentPostActions'

class Post extends Component {

  handleInterestedClick = post => {
    const { user, addPostInterestedIn, removeAvailablePost } = this.props
    addPostInterestedIn(post.id, user.id)
    removeAvailablePost(post.id)
  }

  handleNotInterestedClick = post => {
    const { user, addAvailablePost, removePostInterestedIn } = this.props
    addAvailablePost(post, user.id)
    removePostInterestedIn(post.id, user.id)
  }

  handleManagePostClick = () => {
    const { post, user: {username}, setCurrentPost, history } = this.props
    setCurrentPost(post)
    history.push(`/${username}/posts/${post.id}`)
  }

  renderNotification = () => {
    const { post } = this.props
    const numNew = post.newInterestedUsers ? post.newInterestedUsers.length : 0
    return numNew
              ? <p>{ numNew } new interested { numNew === 1 ? 'user' : 'users' }</p>
              : null
  }

  renderUserInterests = interests => {
    const interestNames = interests.map(interest => interest.name)
    return interestNames.join(', ')
  }

  renderPostFooter = () => {
    const { props: {post, user},
            handleInterestedClick,
            handleNotInterestedClick,
            handleManagePostClick } = this
    const interestedIds = post.interested_users.map(user => user.id)

    if (post.user.id === user.id) {
      return (
        <p>{ interestedIds.length } users are interested <span><button onClick={ handleManagePostClick }>Manage Post</button></span></p>
      )
    } else if (interestedIds.includes(user.id)) {
      return (
        <p>You and { interestedIds.length - 1 } others are interested<span><button onClick={ () => handleNotInterestedClick(post) }>{ "I'm Not Interested" }</button></span></p>
      )
    } else {
      return (
        <p>{ interestedIds.length } users are interested <span><button onClick={ () => handleInterestedClick(post) }>{ "I'm Interested" }</button></span></p>
      )
    }
  }

  render() {
    const { props: {post, user},
            renderNotification,
            renderUserInterests,
            renderPostFooter } = this
    return (
      <div className='post'>
        { renderNotification() }
        <p>{ post.topic.name }</p>
        <p>{ post.neighborhood.name }</p>
        <p>{ post.time_of_day }</p>
        <p>{ post.description }</p>
        <h4>Poster:</h4>
        <p>{ `${post.user.username}, ${post.user.age}, ${post.user.occupation}` }</p>
        <p>{ `"${post.user.bio}"` }</p>
        <p>Likes: { renderUserInterests(post.user.interests) }</p>
        { renderPostFooter() }
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
  removePostInterestedIn,
  setCurrentPost
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))
