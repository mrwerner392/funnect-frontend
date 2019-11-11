import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addAvailablePost } from '../actions/availablePostsActions';
import { addPostInterestedIn } from '../actions/postsImInterestedInActions';
import { removeAvailablePost } from '../actions/availablePostsActions';
import { removePostInterestedIn } from '../actions/postsImInterestedInActions';
import { setCurrentPost } from '../actions/currentPostActions';
import { clearNewInterestedUsers } from '../actions/myCreatedPostsActions';

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
    const { post, user: {username},
            setCurrentPost,
            clearNewInterestedUsers,
            history } = this.props
    setCurrentPost(post)
    if (post.newInterestedUsers) {
      clearNewInterestedUsers(post.id)
    }
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
    if (post.newInterestedUsers) {
      post.newInterestedUsers.forEach(user => interestedIds.push(user.id))
    }

    if (post.user.id === user.id) {
      return (
        <Fragment>
          <p id='my-post-footer-text'>{ interestedIds.length } users are interested</p>
          <button id='my-post-footer-button' onClick={ handleManagePostClick }>Manage Post</button>
        </Fragment>
      )
    } else if (interestedIds.includes(user.id)) {
      return (
        <Fragment>
          <p>You and { interestedIds.length - 1 } others are interested<span><button onClick={ () => handleNotInterestedClick(post) }>{ "I'm Not Interested" }</button></span></p>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <p>{ interestedIds.length } users are interested <span><button onClick={ () => handleInterestedClick(post) }>{ "I'm Interested" }</button></span></p>
        </Fragment>
      )
    }
  }

  render() {
    const { props: {post, user},
            renderNotification,
            renderUserInterests,
            renderPostFooter } = this
    return (
      <Fragment>
        { renderNotification() }
        <div id='post'>
          <div id='post-header'>
            <p className='post-header-item'>{ post.topic.name }</p>
            <p className='post-header-item'>{ post.neighborhood.name }</p>
            <p className='post-header-item'>{ post.time_of_day }</p>
          </div>
          <p id='post-description'>{ post.description }</p>
          <div id='post-user'>
            <h4>ABOUT THE POSTER</h4>
            <p>{ `${post.user.username}, ${post.user.age}, ${post.user.occupation}` }</p>
            <p>{ `"${post.user.bio}"` }</p>
            <p>Likes: { renderUserInterests(post.user.interests) }</p>
          </div>
          <div id='post-footer'>
            { renderPostFooter() }
          </div>
        </div>
      </Fragment>
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
  setCurrentPost,
  clearNewInterestedUsers
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))
