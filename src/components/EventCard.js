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
    const { user, currentEvent } = this.props

    if ( currentEvent.time_hour ) {
      return (
        <div className='event-card-header-item event-card-host-edit'>
          <p className='time' id='event-card-time'>{ `${currentEvent.time_hour}:${currentEvent.time_minute < 10 ? '0' + currentEvent.time_minute : currentEvent.time_minute} ${currentEvent.time_am_pm}` }</p>
          { currentEvent.user.id === user.id ? <button className='event-edit'>Edit</button> : null }
        </div>
        )
    } else {
      return (
        <div className='event-card-header-item event-card-host-edit'>
          { currentEvent.user.id === user.id ? <button className='event-edit'>Edit</button> : <p className='explanation' id='event-card-time'>The host has not set the time.</p> }
        </div>
      )
    }
  }

  renderLocation = () => {
    const { user, currentEvent } = this.props

    if ( currentEvent.location ) {
      return (
        <div className='event-card-header-item event-card-host-edit'>
          <p className='location' id='event-card-location'>{ currentEvent.location }</p>
          { currentEvent.user.id === user.id ? <button className='event-edit'>Edit</button> : <p className='explanation' id='event-card-location'>The host has not set the location.</p> }
        </div>
      )
    } else {
      return (
        <div className='event-card-header-item event-card-host-edit'>
          { currentEvent.user.id === user.id ? <button className='event-edit'>Edit</button> : <p className='explanation' id='event-card-location'>The host has not set the location.</p> }
        </div>
      )
    }
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
