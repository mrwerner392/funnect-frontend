import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ChatContainer from '../containers/ChatContainer'

class EventCard extends Component {

  renderEvent = () => {
    const { renderProps, currentEvent } = this.props

    return (
      <Fragment>
        <p>Description</p>
        <p>{ currentEvent.description }</p>
        <p>Meet at</p>
        <p>{ currentEvent.location }</p>
        <p>Time</p>
        <p>{ `${currentEvent.time_hour}:${currentEvent.time_minute} ${currentEvent.time_am_pm}` }</p>
        <ChatContainer />
      </Fragment>
    )
  }

  render() {
    const { props: {currentEvent}, renderEvent } = this
    console.log(Object.keys(currentEvent).length);
    console.log(currentEvent);
    return (
      <div>
        { Object.keys(currentEvent).length ? renderEvent() : null }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    currentEvent: state.currentEvent
  }
}

export default connect(mapStateToProps)(EventCard)
