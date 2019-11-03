import React, { Component } from 'react';
import MessageDisplay from './MessageDisplay'
import MessageForm from '../components/MessageForm'

class ChatContainer extends Component {

  render() {
    return (
      <div>
        ChatContainer
        <MessageDisplay />
        <MessageForm />
      </div>
    )
  }

}

export default ChatContainer
