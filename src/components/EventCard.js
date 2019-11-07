import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ChatContainer from '../containers/ChatContainer'

class EventCard extends Component {

  renderEvent = () => {
    const { renderProps, /*eventsHosting, eventsAttending,*/ currentEvent } = this.props
    // const myEvents = [...eventsHosting, ...eventsAttending]
    // const eventId = renderProps.match.params.eventSlug
    // const event = myEvents.find(event => event.id === parseInt(eventId, 10))
    // console.log(event.id, currentEvent.id);
    // console.log(event.id === currentEvent.id);
    // if (event) {
      return (
        <Fragment>
          <p>Description</p>
          <p>{ currentEvent.description }</p>
          <p>Meet at</p>
          <p>{ currentEvent.location }</p>
          <p>Time</p>
          <p>{ `${currentEvent.time_hour}:${currentEvent.time_minute} ${currentEvent.time_am_pm}` }</p>
          <ChatContainer />
        </Fragment>
      )
    // }
  }

  render() {
    const { props: {eventsHosting, eventsAttending, currentEvent}, renderEvent } = this

    return (
      <div>
        {
          /*eventsHosting.length || eventsAttending.length
          ? */renderEvent()
          /*: null*/
        }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    eventsHosting: state.eventsHosting.events,
    eventsAttending: state.eventsAttending.events,
    currentEvent: state.currentEvent
  }
}

export default connect(mapStateToProps)(EventCard)
