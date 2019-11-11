import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCurrentEvent } from '../actions/currentEventActions';

class Event extends Component {

  handleViewEventClick = () => {
    const { event, user: {username}, setCurrentEvent, history } = this.props
    setCurrentEvent(event)
    history.push(`/${username}/events/${event.id}`)
  }

  renderNotification = () => {
    const { event } = this.props
    const newMessages = !!event.hasNewMessages
    return newMessages ? <p>New messages</p> : null
  }

  render() {
    const { props: {event}, handleViewEventClick, renderNotification } = this
    return (
      <Fragment>
        { renderNotification() }
        <div id='event'>
          <div id='event-header'>
            <p className='event-header-item'>{ event.today_or_tomorrow }</p>
            <p className='event-header-item'>{ `${event.time_hour}:${event.time_minute < 10 ? '0' + event.time_minute : event.time_minute} ${event.time_am_pm}` }</p>
            <p className='event-header-item'>{ event.location }</p>
          </div>
          <p id='event-description'>{ event.description }</p>
          <div id='event-users'>
            Attendees
          </div>
          <div id='event-footer'>
            <button id='view-event-button' onClick={ handleViewEventClick } >View Event</button>
          </div>
        </div>
      </Fragment>
    )
  }

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
