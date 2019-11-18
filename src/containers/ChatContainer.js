import React, { Fragment } from 'react';
import MessageDisplay from './MessageDisplay'
import MessageForm from '../components/MessageForm'

const ChatContainer = () => {

  return (
    <Fragment>
      <MessageDisplay />
      <MessageForm />
    </Fragment>
  )

}

export default ChatContainer
