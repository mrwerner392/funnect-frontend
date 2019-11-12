import React, { Component, Fragment } from 'react';
import MessageDisplay from './MessageDisplay'
import MessageForm from '../components/MessageForm'

class ChatContainer extends Component {

  render() {
    return (
      <Fragment>
        <MessageDisplay />
        <MessageForm />
      </Fragment>
    )
  }

}

export default ChatContainer
