import React, { Component } from 'react';
import MessageDisplay from './MessageDisplay'
import MessageForm from '../components/MessageForm'

class ChatContainer extends Component {

  render() {
    const { eventId } = this.props
    return (
      <div className='chat-container'>
        <MessageDisplay eventId={ eventId } />
        <MessageForm eventId={ eventId } />
      </div>
    )
  }

}

export default ChatContainer
