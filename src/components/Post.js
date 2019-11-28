import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addAvailablePost } from '../actions/availablePostsActions';
import { addPostInterestedIn } from '../actions/postsImInterestedInActions';
import { removeAvailablePost } from '../actions/availablePostsActions';
import { removePostInterestedIn } from '../actions/postsImInterestedInActions';
import { setCurrentPost } from '../actions/currentPostActions';
import { setCurrentEvent } from '../actions/currentEventActions';
import { clearNewInterestedUsers } from '../actions/myCreatedPostsActions';

const Post = props => {

  const { user,
          post,
          addPostInterestedIn,
          addAvailablePost,
          removePostInterestedIn,
          removeAvailablePost,
          setCurrentPost,
          setCurrentEvent,
          clearNewInterestedUsers,
          eventsHosting,
          eventsAttending,
          history } = props

  // if user clicks the 'I'm Interested' button
  const handleInterestedClick = post => {
    addPostInterestedIn(post.id, user.id)
    removeAvailablePost(post.id)
  }

  // // NOT CURRENTLY IN USE
  // // not rendering the 'not interested' button, so this event
  // // handler will never get called
  // const handleNotInterestedClick = post => {
  //   addAvailablePost(post, user.id)
  //   removePostInterestedIn(post.id, user.id)
  // }

  // if the creator of the post clicks the 'manage post' button
  const handleManagePostClick = () => {
    setCurrentPost(post)

    if (post.newInterestedUsers) {
      clearNewInterestedUsers(post.id)
    }

    history.push(`/${user.username}/posts/${post.id}`)
  }

  // if user clicks 'view event for this post' button
  const handleGoToEventClick = postId => {
    const allEvents = [...eventsHosting, ...eventsAttending]
    const event = allEvents.find(event => event.post.id === postId)

    setCurrentEvent(event)
    history.push(`/${user.username}/events/${event.id}`)
  }

  // is the user is the creator of the post and new people have shown
  // interest, render a noti
  const renderNotification = () => {
    const { post } = props
    const numNew = post.newInterestedUsers ? post.newInterestedUsers.length : 0

    return numNew
              ?
              <p className='post-noti'>
                { numNew } new interested { numNew === 1 ? 'user' : 'users' }
              </p>
              :
              null
  }

  // helper for showing interested users' profile info
  const renderUserInterests = interests => {
    const interestNames = interests.map(interest => interest.name)
    return interestNames.join(', ')
  }

  // 3 possible footers depending on how the user is connected to the post
  const renderPostFooter = () => {
    const interestedIds = post.interested_users.map(user => user.id)
    const allEvents = [...eventsHosting, ...eventsAttending]
    const event = allEvents.find(event => event.post.id === post.id)
    const attendingIds = event
                            ? event.users_attending.map(user => user.id)
                            : []

    if (post.newInterestedUsers) {
      post.newInterestedUsers.forEach(user => interestedIds.push(user.id))
    }

    if (post.user.id === user.id) {
      // if user was the creator of the post
      // const postIdsWithAnEvent = allEvents.map(event => event.post.id)
      // console.log(event);

      return (
        <Fragment>
          <p className='my-post-footer-text'>{ interestedIds.length } users are interested</p>
          {
            event
            ?
            //TODO: would be nice to render this 'view event for this post'
            // button for all users who were invited to the event by the host,
            // as opposed to just for the host as it currently is
            <button className='my-post-footer-button' onClick={ () => handleGoToEventClick(post.id) }>View Event for This Post</button>
            :
            <button className='my-post-footer-button' onClick={ handleManagePostClick }>Manage Post</button>
          }
        </Fragment>
      )
    } else if (interestedIds.includes(user.id)) {
      return (
        <Fragment>
          {
            event && attendingIds.includes(user.id)
            ?
            <Fragment>
              <p className='post-interested-footer-text-2'>You and { interestedIds.length - 1 } others are interested</p>
              <button className='my-post-footer-button' onClick={ () => handleGoToEventClick(post.id) }>View Event for This Post</button>
            </Fragment>
            :
            <p className='post-interested-footer-text'>You and { interestedIds.length - 1 } others are interested</p>
          }

          {/* currently not rendering the 'not interested' button below
          so that users can't remove their interest from a post, but
          functionality is in place if deciding later that it is wanted.
          Just need to uncomment the code below to render the button. */}

          {/*<button id='post-interested-footer-button' onClick={ () => handleNotInterestedClick(post) }>{ "I'm Not Interested" }</button>*/}
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <p className='available-footer-text'>{ interestedIds.length } users are interested</p>
          <button className='available-footer-button' onClick={ () => handleInterestedClick(post) }>{ "I'm Interested" }</button>
        </Fragment>
      )
    }
  }

  return (
    <div className='post-unit'>
      { renderNotification() }
      <div className='post'>
        <div className='post-header'>
          <p className='post-header-item'>{ post.topic.name }</p>
          <p className='post-header-item'>{ post.neighborhood.name }</p>
          <p className='post-header-item'>{ `${post.today_or_tomorrow}, ${post.time_of_day}` }</p>
        </div>
        <p className='post-description'>{ post.description }</p>
        <div className='post-user'>
          <h4 className='about-the-poster'>ABOUT THE POSTER</h4>
          <div className='post-user-info'>
            <p className='post-user-item'>{ `${post.user.username}  |  ${post.user.age}  |  ${post.user.occupation}` }</p>
            <p className='post-user-item'>{ `"${post.user.bio}"` }</p>
            <p className='post-user-item'>Likes: { renderUserInterests(post.user.interests) }</p>
          </div>
        </div>
        <div className='post-footer'>
          { renderPostFooter() }
        </div>
      </div>
    </div>
  )

}

const mapStateToProps = state => {
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
