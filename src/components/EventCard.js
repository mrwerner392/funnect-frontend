import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ChatContainer from '../containers/ChatContainer'

class EventCard extends Component {

  renderEvent = () => {
    const { renderProps, eventsHosting, eventsAttending } = this.props
    const myEvents = [...eventsHosting, ...eventsAttending]
    const eventId = renderProps.match.params.eventSlug
    const event = myEvents.find(event => event.id === parseInt(eventId, 10))
    if (event) {
      return (
        <Fragment>
          <p>Description</p>
          <p>{ event.description }</p>
          <p>Meet at</p>
          <p>{ event.location }</p>
          <p>Time</p>
          <p>{ `${event.time_hour}:${event.time_minute} ${event.time_am_pm}` }</p>
          <ChatContainer />
        </Fragment>
      )
    }
  }

  render() {
    const { props: {eventsHosting, eventsAttending}, renderEvent } = this
    console.log(eventsHosting, eventsAttending);
    return (
      <div>
        {
          eventsHosting.length || eventsAttending.length
          ? renderEvent()
          : null
        }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    eventsHosting: state.eventsHosting.events,
    eventsAttending: state.eventsAttending.events
  }
}

export default connect(mapStateToProps)(EventCard)
