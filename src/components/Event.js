import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCurrentEvent } from '../actions/currentEventActions';

const Event = ({ event, user, setCurrentEvent, history }) => {

  const handleViewEventClick = () => {
    setCurrentEvent(event)
    history.push(`/${user.username}/events/${event.id}`)
  }

  // NOT WORKING PROPERLY
  // newMessagesExist is not a key on each event in redux
  // need to make this key in order for this to work
  const renderNotification = () => {
    const newMessages = !!event.newMessagesExist
    return newMessages ? <p className='event-message-noti'>New messages</p> : null
  }

  const renderAttendees = () => {
    return (
      <Fragment>
        <div className='event-attendee'>
          <p className='event-attendee-item'>{ `${event.user.first_name} (Host)` }</p>
          <p className='event-attendee-item'>{ event.user.age }</p>
          <p className='event-attendee-item'>{ event.user.occupation }</p>
        </div>
        {
          event.users_attending.map(user => {
            return (
              <div key={ user.id } className='event-attendee'>
                <p className='event-attendee-item'>{ user.first_name }</p>
                <p className='event-attendee-item'>{ user.age }</p>
                <p className='event-attendee-item'>{ user.occupation }</p>
              </div>
            )
          })
        }
      </Fragment>
    )
  }

  return (
    <Fragment>
      { renderNotification() }
      <div id='event'>
        <div id='event-header'>
          <p className='event-header-item'>{ event.today_or_tomorrow }</p>
          <p className='event-header-item'>
            {
              event.time_hour
              ?
              `${event.time_hour}:${event.time_minute < 10 ? '0' + event.time_minute : event.time_minute} ${event.time_am_pm}`
              :
              'Time TBD'
            }
          </p>
          <p className='event-header-item'>
            { event.location ? event.location : 'Location TBD' }
          </p>
        </div>
        <p id='event-description'>{ event.description }</p>
        <div id='event-users'>
          <h4 id='event-attendees-label'>Attendees</h4>
          <div id='event-attendees-list'>
            { renderAttendees() }
          </div>
        </div>
        <div id='event-footer'>
          <button id='view-event-button' onClick={ handleViewEventClick } >View Event</button>
        </div>
      </div>
    </Fragment>
  )

}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setCurrentEvent
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Event))
