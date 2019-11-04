import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Event extends Component {

  render() {
    const { event, user } = this.props
    return (
      <div className='Event'>
        <p>{ event.description }</p>
        <p>{ event.location }</p>
        <p>{ `${event.time_hour}:${event.time_minute} ${event.time_am_pm}` }</p>
        <NavLink exact to={ `/${user.username}/events/${event.id}` } >View Event</NavLink>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Event)
