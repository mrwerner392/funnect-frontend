import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addAvailablePost } from '../actions/availablePostsActions';
import { addPostInterestedIn } from '../actions/postsImInterestedInActions';
import { removeAvailablePost } from '../actions/availablePostsActions';
import { removePostInterestedIn } from '../actions/postsImInterestedInActions';
import { setCurrentPost } from '../actions/currentPostActions';
import { setCurrentEvent } from '../actions/currentEventActions';
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

  handleGoToEventClick = postId => {
    const { user: {username},
            eventsHosting,
            eventsAttending,
            setCurrentEvent,
            history } = this.props
    const allEvents = [...eventsHosting, ...eventsAttending]
    console.log(allEvents, postId);
    const event = allEvents.find(event => event.post.id === postId)

    setCurrentEvent(event)
    history.push(`/${username}/events/${event.id}`)
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
    const { props: {post, user, eventsHosting, eventsAttending},
            handleInterestedClick,
            handleNotInterestedClick,
            handleManagePostClick,
            handleGoToEventClick } = this
    const interestedIds = post.interested_users.map(user => user.id)
    if (post.newInterestedUsers) {
      post.newInterestedUsers.forEach(user => interestedIds.push(user.id))
    }

    if (post.user.id === user.id) {
      const allEvents = [...eventsHosting, ...eventsAttending]
      const postIdsWithAnEvent = allEvents.map(event => event.post.id)

      return (
        <Fragment>
          <p id='my-post-footer-text'>{ interestedIds.length } users are interested</p>
          {
            postIdsWithAnEvent.includes(post.id)
            ?
            <button id='my-post-footer-button' onClick={ () => handleGoToEventClick(post.id) }>View Event for This Post</button>
            :
            <button id='my-post-footer-button' onClick={ handleManagePostClick }>Manage Post</button>
          }
        </Fragment>
      )
    } else if (interestedIds.includes(user.id)) {
      return (
        <Fragment>
          <p id='post-interested-footer-text'>You and { interestedIds.length - 1 } others are interested</p>
          {/*<button id='post-interested-footer-button' onClick={ () => handleNotInterestedClick(post) }>{ "I'm Not Interested" }</button>*/}
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <p id='available-footer-text'>{ interestedIds.length } users are interested</p>
          <button id='available-footer-button' onClick={ () => handleInterestedClick(post) }>{ "I'm Interested" }</button>
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
            <p className='post-header-item'>{ `${post.today_or_tomorrow}, ${post.time_of_day}` }</p>
          </div>
          <p id='post-description'>{ post.description }</p>
          <div id='post-user'>
            <h4 id='about-the-poster'>ABOUT THE POSTER</h4>
            <div id='post-user-info'>
              <p className='post-user-item'>{ `${post.user.username}  |  ${post.user.age}  |  ${post.user.occupation}` }</p>
              <p className='post-user-item'>{ `"${post.user.bio}"` }</p>
              <p className='post-user-item'>Likes: { renderUserInterests(post.user.interests) }</p>
            </div>
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
  console.log(state)
  return {
    user: state.user,
    eventsHosting: state.eventsHosting.events,
    eventsAttending: state.eventsAttending.events
  }
}

const mapDispatchToProps = {
  addAvailablePost,
  addPostInterestedIn,
  removeAvailablePost,
  removePostInterestedIn,
  setCurrentPost,
  setCurrentEvent,
  clearNewInterestedUsers
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))
