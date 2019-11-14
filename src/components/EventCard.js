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

  state = {
    time_hour: null,
    time_minute: null,
    time_am_pm: null,
    hostIsEditing: false,
    errors: null
  }

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

  handleEditClick = () => {
    this.setState({
      hostIsEditing: true
    })
  }

  handleEventEditing = evt => {
    console.log(evt.target);
    this.setState({
      [evt.target.name]: evt.target.value,
      errors: null,
    })
  }

  handleSaveTimeEdit = () => {
    const { state: {time_hour, time_minute, time_am_pm},
            props: {currentEvent, updateEventHosting, updateCurrentEvent} } = this
    debugger
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
      // .then(console.log)
      .then(event => {
        updateEventHosting(event)
        updateCurrentEvent(event)
        this.setState({
          time_hour: null,
          time_minute: null,
          time_am_pm: null,
          hostIsEditing: false,
          errors: null
        })
      })
    } else {
      this.setState({
        errors: 'Please choose and appropropiate time.'
      })
    }
  }

  renderTimeHourSelect = () => {
    let hours = []
    for (let i = 1; i <= 12; i++) {
      hours.push(i)
    }
    return (
      <Fragment>
        <option value={ null }></option>
        { hours.map(hour => <option value={ hour }>{ hour }</option>) }
      </Fragment>
    )
  }

  renderTimeMinuteSelect = () => {
    let minutes = [0, 15, 30, 45]
    return (
      <Fragment>
        <option value={ null }></option>
        { minutes.map(minute => <option value={ minute }>{ minute === 0 ? '00' : minute }</option>) }
      </Fragment>
    )
  }

  renderTimeEdit = () => {
    const { state: {time_hour, time_minute, time_am_pm},
            renderTimeHourSelect, renderTimeMinuteSelect, handleEventEditing } = this
    return (
      <div id='time-edit'>
        <select id='time-hour-select' name='time_hour' value={ time_hour } onChange={ handleEventEditing }>
          { renderTimeHourSelect() }
        </select>
        { <span id='time-edit-colon'>:</span> }
        <select id='time-minute-select' name='time_minute' value={ time_minute } onChange={ handleEventEditing }>
          { renderTimeMinuteSelect() }
        </select>
        <select id='time-am-pm-select' name='time_am_pm' value={ time_am_pm } onChange={ handleEventEditing }>
          <option value={ null }></option>
          <option value='am'>am</option>
          <option value='pm'>pm</option>
        </select>
      </div>
    )
  }

  renderTime = () => {
    const { props: {user, currentEvent},
            state: {hostIsEditing},
            renderTimeEdit,
            handleEditClick,
            handleSaveTimeEdit } = this

    if ( currentEvent.user.id === user.id ) {
      return (
        <div className='event-card-header-item event-card-host-edit'>
          { hostIsEditing ? renderTimeEdit() : null }
          { currentEvent.time_hour && !hostIsEditing
            ?
            <p className='time' id='event-card-time'>{ `${currentEvent.time_hour}:${currentEvent.time_minute < 10 ? '0' + currentEvent.time_minute : currentEvent.time_minute} ${currentEvent.time_am_pm}` }</p>
            :
            null
          }
          { hostIsEditing ? <button className='time-edit-submit' onClick={ handleSaveTimeEdit }>Save</button> : <button className='event-edit' value='time' onClick={ handleEditClick }>Edit Time</button> }
        </div>
      )

    }

    if ( currentEvent.time_hour ) {
      return (
        <div className='event-card-header-item event-card-host-edit'>
          <p className='time' id='event-card-time'>{ `${currentEvent.time_hour}:${currentEvent.time_minute < 10 ? '0' + currentEvent.time_minute : currentEvent.time_minute} ${currentEvent.time_am_pm}` }</p>
          { currentEvent.user.id === user.id ? <button className='event-edit' value='time' onClick={ handleEditClick }>Edit Time</button> : null }
        </div>
        )
    } else {
      return (
        <div className='event-card-header-item event-card-host-edit'>
          { currentEvent.user.id === user.id ? <button className='event-edit' value='time' onClick={ handleEditClick }>Edit Time</button> : <p className='explanation' id='event-card-time'>The host has not set the time.</p> }
        </div>
      )
    }
  }

  renderLocation = () => {
    const { props: {user, currentEvent}, handleEditClick } = this

    if ( currentEvent.location ) {
      return (
        <div className='event-card-header-item event-card-host-edit'>
          <p className='location' id='event-card-location'>{ currentEvent.location }</p>
          { currentEvent.user.id === user.id ? <button className='event-edit' value='location' onClick={ handleEditClick }>Edit Location</button> : <p className='explanation' id='event-card-location'>The host has not set the location.</p> }
        </div>
      )
    } else {
      return (
        <div className='event-card-header-item event-card-host-edit'>
          { currentEvent.user.id === user.id ? <button className='event-edit' value='time' onClick={ handleEditClick }>Edit Location</button> : <p className='explanation' id='event-card-location'>The host has not set the location.</p> }
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
