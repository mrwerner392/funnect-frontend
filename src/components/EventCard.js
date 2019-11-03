import React, { Component } from 'react';

class EventCard extends Component {

  render() {
    console.log(this.props.renderProps.match.params.eventSlug);
    return (
      <div>
        <p>Description</p>
        <p>{ null }</p>
        <p>Meet at</p>
        <p>{ null }</p>
        <p>Time</p>
        <p>{ null }</p>
      </div>
    )
  }

}

export default EventCard
