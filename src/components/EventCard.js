import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChatContainer from '../containers/ChatContainer';
import { toggleEventsHostingNewMessagesExist } from '../actions/eventsImHostingActions';
import { toggleEventsAttendingNewMessagesExist } from '../actions/eventsImAttendingActions';
import { toggleHasNewInfo } from '../actions/userActions';
import { setContentType } from '../actions/contentTypeActions';

class EventCard extends Component {

  handleBackToEventsClick = () => {
    const { user,
            eventsHostingNewMessagesExist,
            eventsAttendingNewMessagesExist,
            toggleEventsHostingNewMessagesExist,
            toggleEventsAttendingNewMessagesExist,
            newInterestedUsersExist,
            toggleHasNewInfo,
            setContentType,
            history } = this.props

    if (eventsHostingNewMessagesExist) {
      toggleEventsHostingNewMessagesExist()
    }

    if (eventsAttendingNewMessagesExist) {
      toggleEventsAttendingNewMessagesExist()
    }

    if (user.hasNewInfo && !newInterestedUsersExist) {
      toggleHasNewInfo()
    }

    setContentType('user-events')
    history.push(`/${user.username}/events`)
  }

  renderTime = () => {
    const { currentEvent } = this.props
    return currentEvent.time_hour
        ? <p className='event-card-header-item time'>{ `${currentEvent.time_hour}:${currentEvent.time_minute < 10 ? '0' + currentEvent.time_minute : currentEvent.time_minute} ${currentEvent.time_am_pm}` }</p>
        : <p className='event-card-header-item explanation'>Discuss a time with the other attendees. The host will set it here.</p>
  }

  renderLocation = () => {
    const { currentEvent } = this.props
    return currentEvent.location
        ? <p className='event-card-header-item location' id='event-card-location'>{ currentEvent.location }</p>
        : <p className='event-card-header-item explanation' id='event-card-location'>Discuss a location with the other attendees. The host will set it here.</p>
  }

  renderUserInterests = interests => {
    const interestNames = interests.map(interest => interest.name)
    return interestNames.join(', ')
  }

  renderUsers = () => {
    const { props: {currentEvent, currentEvent: {user}}, renderUserInterests } = this
    return (
      <Fragment>
        <div className='event-card-user'>
          <p className='event-card-user-item'>{ `${user.first_name}  |  ${user.age}  |  ${user.gender}` }</p>
          <p className='event-card-user-item'>{ `"${user.bio}"` }</p>
          <p className='event-card-user-item'>{ `${user.occupation}` }</p>
          <p className='event-card-user-item'>
            Likes: { renderUserInterests(user.interests) }
          </p>
        </div>
        {
          currentEvent.users_attending.map(user => {
            return (
              <div className='event-card-user'>
                <p className='event-card-user-item'>{ `${user.first_name}  |  ${user.age}  |  ${user.gender}` }</p>
                <p className='event-card-user-item'>{ `"${user.bio}"` }</p>
                <p className='event-card-user-item'>{ `${user.occupation}` }</p>
                <p className='event-card-user-item'>
                  Likes: { renderUserInterests(user.interests) }
                </p>
              </div>
            )
          })
        }
      </Fragment>
    )
  }

  renderEvent = () => {
    const { props: {renderProps, currentEvent},
            renderTime,
            renderLocation,
            renderUsers } = this

    return (
      <div id='event-card'>
        <div id='event-card-header'>
          <p className='event-card-header-item' id='event-card-day'>{ currentEvent.today_or_tomorrow }</p>
          { renderTime() }
          { renderLocation() }
        </div>
        <p id='event-card-description'>{ currentEvent.description }</p>
        <div id='event-card-attendees-label'>
          { `${currentEvent.users_attending.length + 1} Attendees` }
        </div>
        <div id='event-card-users'>
          { renderUsers() }
        </div>
        <div id='event-card-footer'>
          <ChatContainer />
        </div>
      </div>
    )
  }

  render() {
    const { props: {currentEvent}, renderEvent, handleBackToEventsClick } = this
    return (
      <Fragment>
        <button className='back-button' onClick={ handleBackToEventsClick }>Back to My Events</button>
        { Object.keys(currentEvent).length ? renderEvent() : null }
      </Fragment>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user,
    currentEvent: state.currentEvent,
    newInterestedUsersExist: state.createdPosts.newInterestedUsersExist,
    eventsHostingNewMessagesExist: state.eventsHosting.newMessagesExist,
    eventsAttendingNewMessagesExist: state.eventsAttending.newMessagesExist
  }
}

const mapDispatchToProps = {
  toggleEventsHostingNewMessagesExist,
  toggleEventsAttendingNewMessagesExist,
  toggleHasNewInfo,
  setContentType
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventCard))
