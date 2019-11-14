import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { newEventAttendingSeen } from '../actions/eventsImAttendingActions';
import { setCurrentEvent } from '../actions/currentEventActions'

class EventNotification extends Component {

  handleClick = direction => {
    const { user,
            eventWaiting,
            newEventAttendingSeen,
            setCurrentEvent,
            history } = this.props
    newEventAttendingSeen()
    if (direction === 'go') {
      setCurrentEvent(eventWaiting)
      history.push(`/${user.username}/events/${eventWaiting.id}`)
    }
  }

  render() {
    const { handleClick } = this
    return (
      <div className='event-noti'>
        <p>You have been invited to a new event!</p>
        <button className='event-noti-button' onClick={ () => handleClick('go') }>Go to Event</button>
        <button className='event-noti-button' onClick={ () => handleClick('stay') }>Ok</button>
      </div>
    )
  }

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
