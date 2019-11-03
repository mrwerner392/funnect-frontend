import React, { Component } from 'react';
import Message from '../components/Message';
import { ActionCable } from 'react-actioncable-provider';

class MessageDisplay extends Component {

  handleNewMessage = message => {
    console.log('new message');
  }

  render() {
    const { handleNewMessage } = this
    return (
      <div>
        MessageDisplay
        <ActionCable channel={{channel: 'ChatChannel'}}
                      onReceived={ handleNewMessage }/>
        <Message />
        <Message />
      </div>

    )
  }

}

export default MessageDisplay
