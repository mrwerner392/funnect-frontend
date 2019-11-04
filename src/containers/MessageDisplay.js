import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';
import Message from '../components/Message';
import { addEventHostingMessage } from '../actions/eventsImHostingActions'
import { addEventAttendingMessage } from '../actions/eventsImAttendingActions'

class MessageDisplay extends Component {

  handleNewMessage = ({ message }) => {
    const { eventId,
            eventsHosting,
            eventsAttending,
            addEventHostingMessage,
            addEventAttendingMessage } = this.props

    if (eventsHosting.find(event => event.user.id === parseInt(localStorage.id))) {
      addEventHostingMessage(message, eventId)
    } else {
      addEventAttendingMessage(message, eventId)
    }
  }

  renderMessages = () => {
    console.log('rendering messages');
    const { eventId, eventsHosting, eventsAttending } = this.props
    const myEvents = [...eventsHosting, ...eventsAttending]
    const event = myEvents.find(event => event.id === parseInt(eventId, 10))
    console.log(event.messages);
    return event.messages.map(message => <p>{ message.content }</p>)
  }

  render() {
    const { props: {eventId}, handleNewMessage, renderMessages } = this
    return (
      <div>
        MessageDisplay
        <ActionCable
              channel={ {channel: 'EventChatsChannel', event_id: eventId} }
              onReceived={ handleNewMessage } />
        { renderMessages() }
      </div>

    )
  }

}

const mapStateToProps = state => {
  console.log(state.eventsHosting);
  return {
    eventsHosting: state.eventsHosting.events,
    eventsAttending: state.eventsAttending.events
  }
}

const mapDispatchToProps = {
  addEventHostingMessage,
  addEventAttendingMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageDisplay)
