import React, { Component } from 'react';
import Message from '../components/Message'

class MessageDisplay extends Component {

  render() {
    return (
      <div>
        MessageDisplay
        <Message />
        <Message />
      </div>

    )
  }

}

export default MessageDisplay
