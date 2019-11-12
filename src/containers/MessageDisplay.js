import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { ActionCableConsumer } from 'react-actioncable-provider';
import Message from '../components/Message';
import { addEventHostingMessage } from '../actions/eventsImHostingActions'
import { addEventAttendingMessage } from '../actions/eventsImAttendingActions'
import { addCurrentEventMessage } from '../actions/currentEventActions'

class MessageDisplay extends Component {

  displayRef = createRef()

  renderMessages = () => {
    const { currentEvent } = this.props
    return currentEvent.messages.map(message => <Message key={ message.id } message={ message } />)
  }

  scrollAllTheWayDown = () => {
    const display = this.displayRef.current
    display.scrollTop = display.scrollHeight
  }

  componentDidMount() {
    const { scrollAllTheWayDown } = this
    scrollAllTheWayDown()
  }

  componentDidUpdate() {
    const { scrollAllTheWayDown } = this
    scrollAllTheWayDown()
  }

  render() {
    const { props: {currentEvent}, handleNewMessage, renderMessages, displayRef } = this
    return (
      <div id='message-display' ref={ displayRef }>
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
