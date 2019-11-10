import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChatContainer from '../containers/ChatContainer';
import { toggleEventsHostingNewMessagesExist } from '../actions/eventsImHostingActions';
import { toggleEventsAttendingNewMessagesExist } from '../actions/eventsImAttendingActions';
import { toggleHasNewInfo } from '../actions/userActions';

class EventCard extends Component {

  handleBackToEventsClick = () => {
    const { user,
            eventsHostingNewMessagesExist,
            eventsAttendingNewMessagesExist,
            toggleEventsHostingNewMessagesExist,
            toggleEventsAttendingNewMessagesExist,
            newInterestedUsersExist,
            toggleHasNewInfo,
            history } = this.props

    if (eventsHostingNewMessagesExist) {
      toggleEventsHostingNewMessagesExist()
    }

    if (eventsAttendingNewMessagesExist) {
      toggleEventsAttendingNewMessagesExist()
    }

    if (user.hasNewInfo && !newInterestedUsersExist) {
      toggleHasNewInfo()
    }

    history.push(`/${user.username}/events`)
  }

  renderEvent = () => {
    const { renderProps, currentEvent } = this.props

    return (
      <Fragment>
        <p>Description</p>
        <p>{ currentEvent.description }</p>
        <p>Meet at</p>
        <p>{ currentEvent.location }</p>
        <p>Time</p>
        <p>{ `${currentEvent.time_hour}:${currentEvent.time_minute < 10 ? '0' + currentEvent.time_minute : currentEvent.time_minute} ${currentEvent.time_am_pm}` }</p>
        <ChatContainer />
      </Fragment>
    )
  }

  render() {
    const { props: {currentEvent}, renderEvent, handleBackToEventsClick } = this
    return (
      <div>
        <button onClick={ handleBackToEventsClick }>Back to My Events</button>
        { Object.keys(currentEvent).length ? renderEvent() : null }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user,
    currentEvent: state.currentEvent,
    newInterestedUsersExist: state.createdPosts.newInterestedUsersExist,
    eventsHostingNewMessagesExist: state.eventsHosting.newMessagesExist,
    eventsAttendingNewMessagesExist: state.eventsAttending.newMessagesExist
  }
}

const mapDispatchToProps = {
  toggleEventsHostingNewMessagesExist,
  toggleEventsAttendingNewMessagesExist,
  toggleHasNewInfo
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventCard))
