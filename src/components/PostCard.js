import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { newEventHosting } from '../actions/eventsImHostingActions';
import { toggleNewInterestedUsersExist } from '../actions/myCreatedPostsActions';
import { toggleHasNewInfo } from '../actions/userActions';
import { setContentType } from '../actions/contentTypeActions';

class PostCard extends Component {

  state = {
    attendees: []
  }

  handleCreateEvent = postId => {
    const { props: {newEventHosting}, state: {attendees} } = this
    newEventHosting({post_id: postId, user_id: localStorage.id, attendees})
  }

  handleAddToEventList = id => {
    this.setState(prevState => {
      return {
        attendees: [...prevState.attendees, id]
      }
    })
  }

  handleBackToPostsClick = () => {
    const { user,
            newInterestedUsersExist,
            toggleNewInterestedUsersExist,
            eventsHostingNewMessagesExist,
            eventsAttendingNewMessagesExist,
            toggleHasNewInfo,
            setContentType,
            history } = this.props

    if (newInterestedUsersExist) {
      toggleNewInterestedUsersExist()
    }

    const userHasNewMessages = (
      eventsHostingNewMessagesExist || eventsAttendingNewMessagesExist
    )

    if (user.hasNewInfo && !userHasNewMessages) {
      toggleHasNewInfo()
    }

    setContentType('user-posts')
    history.push(`/${user.username}/posts`)
  }

  renderInterestedUsers = post => {
    const {state: {attendees}, handleAddToEventList} = this
    return(
      <Fragment>
        {
          post.interested_users.map(user => (
            <div key={ user.id }>
              <p>{ user.username }</p>
              <p>{ user.age }</p>
              <p>{ user.gender }</p>
              <p>{ user.bio }</p>
              <p>{ user.college }</p>
              <p>{ user.occupation }</p>
              <button onClick={ () => handleAddToEventList(user.id) }>Add to Event List</button>
            </div>
          ))
        }
      </Fragment>
    )
  }

  renderPost = () => {
    const { state: {attendees},
            props: {renderProps, currentPost},
            handleCreateEvent, renderInterestedUsers } = this

    return (
        <div id='post-card'>
          <div id='post-card-header'>
            <p className='post-card-header-item' id='post-card-topic'>{ currentPost.topic.name }</p>
            <p className='post-card-header-item'>{ currentPost.neighborhood.name }</p>
            <p className='post-card-header-item' id='post-card-time-day'>{ `${currentPost.today_or_tomorrow}, ${currentPost.time_of_day}` }</p>
          </div>
          <div id='post-card-description'>
            { currentPost.description }
          </div>
          <div id='post-card-users'>
            { renderInterestedUsers(currentPost) }
          </div>
          <div id='post-card-footer'>
            <button id='create-event-button' disabled={ attendees.length ? false : true } onClick={ () => handleCreateEvent(currentPost.id) }>Create Event</button>
          </div>
        </div>
    )
  }

  render() {
    const { props: {currentPost}, renderPost, handleBackToPostsClick } = this

    return (
      <Fragment>
        <button className='back-button' onClick={ handleBackToPostsClick }>Back to My Posts</button>
        { Object.keys(currentPost).length ? renderPost() : null }
      </Fragment>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user,
    currentPost: state.currentPost,
    newInterestedUsersExist: state.createdPosts.newInterestedUsersExist,
    eventsHostingNewMessagesExist: state.eventsHosting.newMessagesExist,
    eventsAttendingNewMessagesExist: state.eventsAttending.newMessagesExist
  }
}

const mapDispatchToProps = {
  newEventHosting,
  toggleNewInterestedUsersExist,
  toggleHasNewInfo,
  setContentType
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCard))
