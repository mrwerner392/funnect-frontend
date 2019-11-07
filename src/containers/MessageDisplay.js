import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCableConsumer } from 'react-actioncable-provider';
import Message from '../components/Message';
import { addEventHostingMessage } from '../actions/eventsImHostingActions'
import { addEventAttendingMessage } from '../actions/eventsImAttendingActions'
import { addCurrentEventMessage } from '../actions/currentEventActions'

class MessageDisplay extends Component {

  handleNewMessage = ({ message }) => {
    console.log('received');
    const { user,
            currentEvent,
            addEventHostingMessage,
            addEventAttendingMessage,
            addCurrentEventMessage } = this.props

    if (currentEvent.user.id === user.id) {
      addEventHostingMessage(message, currentEvent.id)
    } else {
      addEventAttendingMessage(message, currentEvent.id)
    }

    addCurrentEventMessage(message)
  }

  renderMessages = () => {
    const { currentEvent } = this.props
    return currentEvent.messages.map(message => <p>{ message.content }</p>)
  }

  render() {
    const { props: {currentEvent}, handleNewMessage, renderMessages } = this
    return (
      <div>
        <ActionCableConsumer
              channel={ {channel: 'EventChatsChannel', event_id: currentEvent.id} }
              onReceived={ handleNewMessage } />
        { renderMessages() }
      </div>

    )
  }

}

const mapStateToProps = state => {
  console.log(state.currentEvent);
  return {
    user: state.user,
    currentEvent: state.currentEvent
  }
}

const mapDispatchToProps = {
  addEventHostingMessage,
  addEventAttendingMessage,
  addCurrentEventMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageDisplay)
