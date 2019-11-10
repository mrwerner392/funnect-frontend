import React, { Component } from 'react';
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
      <div className='event'>
        { renderNotification() }
        <p>{ event.description }</p>
        <p>{ event.location }</p>
        <p>{ `${event.time_hour}:${event.time_minute < 10 ? '0' + event.time_minute : event.time_minute} ${event.time_am_pm}` }</p>
        <button onClick={ handleViewEventClick } >View Event</button>
      </div>
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
