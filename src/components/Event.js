import React, { Component } from 'react';

class Event extends Component {

  render() {
    const { event } = this.props
    return (
      <div className='Event'>
        <p>{ event.description }</p>
        <p>{ event.location }</p>
        <p>{ `${event.time_hour}:${event.time_minute} ${event.time_am_pm}` }</p>
      </div>
    )
  }

}

export default Event
