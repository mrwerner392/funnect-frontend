import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChatContainer from '../containers/ChatContainer';
import { toggleEventsHostingNewMessagesExist, updateEventHosting } from '../actions/eventsImHostingActions';
import { toggleEventsAttendingNewMessagesExist } from '../actions/eventsImAttendingActions';
import { updateCurrentEvent } from '../actions/currentEventActions'
import { toggleHasNewInfo } from '../actions/userActions';
import { setContentType } from '../actions/contentTypeActions';

const URL = 'http://localhost:3000'

class EventCard extends Component {

  // local state for when event host updates event time and location
  state = {
    time_hour: null,
    time_minute: null,
    time_am_pm: null,
    location: null,
    hostIsEditingTime: false,
    hostIsEditingLocation: false,
    errors: null
  }

  // when user clicks 'back to events' button
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

    // prevents new messages noti from showing in user filter bar
    // (because user is going to his/her events page where they will
    // see the new messages, so noti not necessary)

    if (eventsHostingNewMessagesExist) {
      toggleEventsHostingNewMessagesExist()
    }

    if (eventsAttendingNewMessagesExist) {
      toggleEventsAttendingNewMessagesExist()
    }

    // if user has new info because of new messages but doesn't
    // have new interested users on his/her posts, then remove the
    // new info noti in user nav bar
    // (user will have new info if has new messages OR new interested users)
    if (user.hasNewInfo && !newInterestedUsersExist) {
      toggleHasNewInfo()
    }

    setContentType('user-events')
    history.push(`/${user.username}/events`)
  }

  // only applies if user is host
  handleEditTimeClick = () => {
    this.setState({
      hostIsEditingTime: true
    })
  }

  // only applies if user is host
  handleEditLocationClick = () => {
    this.setState({
      hostIsEditingLocation: true
    })
  }

  // only applies if user is host
  handleEventEditing = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
      errors: null,
    })
  }

  // only applies if user is host
  handleSaveTimeEdit = () => {
    const { state: {time_hour, time_minute, time_am_pm},
            props: {currentEvent, updateEventHosting, updateCurrentEvent} } = this

    if (time_hour !== null && time_minute !== null && time_am_pm !== '') {
      const config = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': localStorage.token
        },
        body: JSON.stringify({
          time_hour,
          time_minute,
          time_am_pm
        })
      }

      fetch(URL + `/events/${currentEvent.id}/update_time`, config)
      .then(res => res.json())
      .then(event => {
        updateEventHosting(event)
        updateCurrentEvent(event)
        this.setState({
          time_hour: null,
          time_minute: null,
          time_am_pm: null,
          hostIsEditingTime: false,
          errors: null
        })
      })
    } else {
      this.setState({
        errors: 'Please choose and appropropiate time.'
      })
    }
  }

  // only applies if user is host
  handleSaveLocationEdit = () => {
    const { state: {location},
            props: {currentEvent, updateEventHosting, updateCurrentEvent} } = this

    if (location != null) {
      const config = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': localStorage.token
        },
        body: JSON.stringify({
          location
        })
      }

      fetch(URL + `/events/${currentEvent.id}/update_location`, config)
      .then(res => res.json())
      .then(event => {
        updateEventHosting(event)
        updateCurrentEvent(event)
        this.setState({
          location: null,
          hostIsEditingLocation: false,
          errors: null
        })
      })
    }
  }

  // only applies if user is host
  renderTimeHourSelect = () => {
    let hours = []
    for (let i = 1; i <= 12; i++) {
      hours.push(i)
    }
    return (
      <Fragment>
        <option value={ null }></option>
        { hours.map(hour => <option key={ hour } value={ hour }>{ hour }</option>) }
      </Fragment>
    )
  }

  // only applies if user is host
  renderTimeMinuteSelect = () => {
    let minutes = [0, 15, 30, 45]
    return (
      <Fragment>
        <option value={ null }></option>
        { minutes.map(minute => <option key={ minute } value={ minute }>{ minute === 0 ? '00' : minute }</option>) }
      </Fragment>
    )
  }

  // only applies if user is host
  renderTimeEdit = () => {
    const { state: {time_hour, time_minute, time_am_pm},
            renderTimeHourSelect, renderTimeMinuteSelect, handleEventEditing } = this
    return (
      <div id='time-edit'>
        <select className='time-select' name='time_hour' value={ time_hour } onChange={ handleEventEditing }>
          { renderTimeHourSelect() }
        </select>
        { <span id='time-edit-colon'>:</span> }
        <select className='time-select' name='time_minute' value={ time_minute } onChange={ handleEventEditing }>
          { renderTimeMinuteSelect() }
        </select>
        <select className='time-select' name='time_am_pm' value={ time_am_pm } onChange={ handleEventEditing }>
          <option value={ null }></option>
          <option value='am'>am</option>
          <option value='pm'>pm</option>
        </select>
      </div>
    )
  }

  renderTime = () => {
    const { props: {user, currentEvent},
            state: {hostIsEditingTime},
            renderTimeEdit,
            handleEditTimeClick,
            handleSaveTimeEdit } = this

    if ( currentEvent.user.id === user.id ) {
      return (
        <div className='event-card-header-item event-card-host-edit'>
          { hostIsEditingTime ? renderTimeEdit() : null }
          {
            currentEvent.time_hour && !hostIsEditingTime
            ?
            <p className='time' id='event-card-time'>{ `${currentEvent.time_hour}:${currentEvent.time_minute < 10 ? '0' + currentEvent.time_minute : currentEvent.time_minute} ${currentEvent.time_am_pm}` }</p>
            :
            null
          }
          { hostIsEditingTime ? <button className='event-edit-submit' onClick={ handleSaveTimeEdit }>Save</button> : <button className='event-edit' value='time' onClick={ handleEditTimeClick }>Edit Time</button> }
        </div>
      )

    } else if ( currentEvent.time_hour ) {
      return (
        <div className='event-card-header-item event-card-host-edit'>
          <p className='time' id='event-card-time'>{ `${currentEvent.time_hour}:${currentEvent.time_minute < 10 ? '0' + currentEvent.time_minute : currentEvent.time_minute} ${currentEvent.time_am_pm}` }</p>
        </div>
        )
    } else {
      return (
        <div className='event-card-header-item event-card-host-edit'>
          <p className='explanation' id='event-card-time'>The host has not set the time.</p>
        </div>
      )
    }
  }

  renderLocation = () => {
    const { props: {user, currentEvent},
            state: {location, hostIsEditingLocation},
            handleEditLocationClick,
            handleEventEditing,
            handleSaveLocationEdit } = this

    if ( currentEvent.user.id === user.id ) {
      return (
        <div className='event-card-header-item event-card-host-edit'>
          {
            hostIsEditingLocation
            ?
            <input id='location-edit' name='location' value={ location } onChange={ handleEventEditing } />
            :
            null
          }
          {
            currentEvent.location && !hostIsEditingLocation
            ?
            <p className='location' id='event-card-location'>{ currentEvent.location }</p>
            :
            null
          }
          { hostIsEditingLocation ? <button className='event-edit-submit' onClick={ handleSaveLocationEdit }>Save</button> : <button className='event-edit' value='location' onClick={ handleEditLocationClick }>Edit Location</button> }
        </div>
      )
    } else if ( currentEvent.location ) {
      return (
        <div className='event-card-header-item event-card-host-edit'>
          <p className='location' id='event-card-location'>{ currentEvent.location }</p>
        </div>
      )
    } else {
      return (
        <div className='event-card-header-item event-card-host-edit'>
          <p className='explanation' id='event-card-location'>The host has not set the location.</p>
        </div>
      )
    }
  }

  renderUserInterests = interests => {
    const interestNames = interests.map(interest => interest.name)
    return interestNames.join(', ')
  }

  // render event attendees including the host
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
              <div key={ user.id } className='event-card-user'>
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
    const { props: {currentEvent},
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
    const { props: {currentEvent},
            state: {errors},
            renderEvent,
            handleBackToEventsClick } = this

    return (
      <Fragment>
        <button className='back-button' onClick={ handleBackToEventsClick }>Back to My Events</button>
        { errors ? <p id='event-card-errors'>{ errors }</p> : null }
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
  setContentType,
  updateEventHosting,
  updateCurrentEvent
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventCard))
