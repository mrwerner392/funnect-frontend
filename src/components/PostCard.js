import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { newEventHosting, addEvent } from '../actions/eventsImHostingActions';
import { toggleNewInterestedUsersExist } from '../actions/myCreatedPostsActions';
import { toggleHasNewInfo } from '../actions/userActions';
import { setContentType } from '../actions/contentTypeActions';
import { setCurrentEvent } from '../actions/currentEventActions';

const URL = 'http://localhost:3000'

class PostCard extends Component {

  state = {
    attendees: []
  }

  handleCreateEvent = postId => {
    const { props: {addEvent, user, history, setCurrentEvent},
            state: {attendees} } = this
    // newEventHosting({post_id: postId, user_id: localStorage.id, attendees})

    const eventInfo = {post_id: postId, user_id: user.id, attendees}
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.token
      },
      body: JSON.stringify(eventInfo)
    }

    fetch(URL + '/events', config)
    .then(res => res.json())
    .then(event => {
      addEvent(event)
      setCurrentEvent(event)
      history.push(`/${user.username}/events/${event.id}`)
    })
  }

  handleAddToEventList = id => {
    this.setState(prevState => {
      return {
        attendees: [...prevState.attendees, id]
      }
    })
  }

  handleRemoveFromEventList = userId => {
    this.setState(prevState => {
      return {
        attendees: prevState.attendees.filter(id => id !== userId)
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

  renderUserInterests = interests => {
    const interestNames = interests.map(interest => interest.name)
    return interestNames.join(', ')
  }

  renderInterestedUsers = () => {
    const { state: {attendees},
            props: {currentPost},
            renderUserInterests,
            handleAddToEventList,
            handleRemoveFromEventList } = this

    return(
      <Fragment>
        {
          currentPost.interested_users.map(user => (
            <div className='post-card-interested-user' key={ user.id }>
              <p className='post-card-user-item'>{ `${user.username}  |  ${user.age}  |  ${user.occupation}` }</p>
              <p className='post-card-user-item'>{ `"${user.bio}"` }</p>
              <p className='post-card-user-item'>
                Likes: { renderUserInterests(user.interests) }
              </p>
              {
                attendees.includes(user.id)
                ?
                <button className='remove-from-event-list'
                        onClick={ () => handleRemoveFromEventList(user.id) }
                        >
                  Added! (Click to Remove)
                </button>
                :
                <button className='add-to-event-list'
                        onClick={ () => handleAddToEventList(user.id) }
                        >
                  Add to Event List
                </button>
              }
            </div>
          ))
        }
      </Fragment>
    )
  }

  renderPost = () => {
    const { state: {attendees},
            props: {currentPost},
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
          <h1 id='post-card-interested-label'>Interested Users</h1>
          <div id='post-card-users'>
            { renderInterestedUsers() }
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
  setContentType,
  addEvent,
  setCurrentEvent
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCard))
