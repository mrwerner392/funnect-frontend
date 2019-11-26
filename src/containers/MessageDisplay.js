import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import Message from '../components/Message';
import { addEventHostingMessage } from '../actions/eventsImHostingActions'
import { addEventAttendingMessage } from '../actions/eventsImAttendingActions'
import { addCurrentEventMessage } from '../actions/currentEventActions'

class MessageDisplay extends Component {

  // ref used to keep display scrolled to bottom
  displayRef = createRef()

  renderMessages = () => {
    const { currentEvent } = this.props
    return currentEvent.messages.map(message => <Message key={ message.id } message={ message } />)
  }

  // make sure display is scrolled down so user sees newest messages
  scrollAllTheWayDown = () => {
    const display = this.displayRef.current
    display.scrollTop = display.scrollHeight
  }

  // scroll display all the way down on mount
  componentDidMount() {
    const { scrollAllTheWayDown } = this
    scrollAllTheWayDown()
  }

  // scroll display all the way down on update
  componentDidUpdate() {
    const { scrollAllTheWayDown } = this
    scrollAllTheWayDown()
  }

  render() {
    const { renderMessages, displayRef } = this

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
