import React, { Component } from 'react';
import Message from '../components/Message';
import { ActionCable } from 'react-actioncable-provider';

class MessageDisplay extends Component {

  render() {
    return (
      <div>
        MessageDisplay
        <ActionCable />
        <Message />
        <Message />
      </div>

    )
  }

}

export default MessageDisplay
