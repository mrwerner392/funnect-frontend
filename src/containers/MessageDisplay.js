import React, { Component } from 'react';
import Message from '../components/Message';
import { ActionCable } from 'react-actioncable-provider';

class MessageDisplay extends Component {

  handleNewMessage = message => {
    console.log('new message');
  }

  render() {
    const { props: {eventId}, handleNewMessage } = this
    console.log(eventId);
    return (
      <div>
        MessageDisplay
        <ActionCable
              channel={ {channel: 'EventChatsChannel', event_id: eventId} }
              onReceived={ handleNewMessage }/>
        <Message />
        <Message />
      </div>

    )
  }

}

export default MessageDisplay
