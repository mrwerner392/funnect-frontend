import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCableConsumer } from 'react-actioncable-provider';
import Message from '../components/Message';
import { addEventHostingMessage } from '../actions/eventsImHostingActions'
import { addEventAttendingMessage } from '../actions/eventsImAttendingActions'
import { addCurrentEventMessage } from '../actions/currentEventActions'

class MessageDisplay extends Component {

  renderMessages = () => {
    const { currentEvent } = this.props
    return currentEvent.messages.map(message => <p>{ message.content }</p>)
  }

  render() {
    const { props: {currentEvent}, handleNewMessage, renderMessages } = this
    return (
      <div>
        { renderMessages() }
      </div>

    )
  }

}

const mapStateToProps = state => {
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
