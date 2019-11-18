import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { newEventAttendingSeen } from '../actions/eventsImAttendingActions';
import { setCurrentEvent } from '../actions/currentEventActions'

const EventNotification = props => {

  const { user,
          eventWaiting,
          newEventAttendingSeen,
          setCurrentEvent,
          history } = props

  const handleClick = direction => {
    newEventAttendingSeen()
    if (direction === 'go') {
      setCurrentEvent(eventWaiting)
      history.push(`/${user.username}/events/${eventWaiting.id}`)
    }
  }

  return (
    <div className='event-noti'>
      <p>You have been invited to a new event!</p>
      <button className='event-noti-button' onClick={ () => handleClick('go') }>Go to Event</button>
      <button className='event-noti-button' onClick={ () => handleClick('stay') }>Ok</button>
    </div>
  )

}

const mapStateToProps = state => {
  return {
    user: state.user,
    eventWaiting: state.eventsAttending.eventWaiting
  }
}

const mapDispatchToProps = {
  newEventAttendingSeen,
  setCurrentEvent
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventNotification))
