import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Event extends Component {

  handleViewEventClick = () => {
    const { event: {id}, user: {username}, history } = this.props

    history.push(`/${username}/events/${id}`)
  }

  render() {
    const { props: {event}, handleViewEventClick } = this
    return (
      <div className='event'>
        <p>{ event.description }</p>
        <p>{ event.location }</p>
        <p>{ `${event.time_hour}:${event.time_minute} ${event.time_am_pm}` }</p>
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

export default withRouter(connect(mapStateToProps)(Event))
