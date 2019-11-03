import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';
import Message from '../components/Message';
import addEventHostingMessage from '../actions/eventsImHostingActions'
import addEventAttendingMessage from '../actions/eventsImHostingActions'

class MessageDisplay extends Component {

  handleNewMessage = message => {

  }

  render() {
    const { props: {eventId}, handleNewMessage } = this
    return (
      <div>
        MessageDisplay
        <ActionCable
              channel={ {channel: 'EventChatsChannel', event_id: eventId} }
              onReceived={ handleNewMessage } />
        <Message />
        <Message />
      </div>

    )
  }

}

const mapStateToProps = state => {
  eventsHosting: state.eventsHosting.events,
  eventsAttending: state.eventsAttending.events
}

const mapDispatchToProps = {

}

export default MessageDisplay
