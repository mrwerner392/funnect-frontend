import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addEventHostingMessage, toggleEventsHostingNewMessagesExist } from '../actions/eventsImHostingActions';
import { addEventAttendingMessage, toggleEventsAttendingNewMessagesExist } from '../actions/eventsImAttendingActions';
import { addCurrentEventMessage } from '../actions/currentEventActions';
import { toggleHasNewInfo } from '../actions/userActions';
import { ActionCableConsumer } from 'react-actioncable-provider';

const EventChatChannelCable = props => {

  const { user,
          eventsHosting,
          eventsAttending,
          addEventHostingMessage,
          addEventAttendingMessage,
          addCurrentEventMessage,
          toggleEventsHostingNewMessagesExist,
          toggleEventsAttendingNewMessagesExist,
          toggleHasNewInfo,
          history } = props

  const handleNewMessage = (message, event) => {

    if (event.user.id === user.id) {
      addEventHostingMessage(message, event.id)
    } else {
      addEventAttendingMessage(message, event.id)
    }


    // logic for if and when to show notifications

    const location = history.location.pathname
    if (location === `/${user.username}/events/${event.id}`) {
      // if user is viewing the event that has new message, add message there
        // current message being viewed held separately in state
      addCurrentEventMessage(message)
    } else {

      // if not already viewing the event, determine if we need to show
      // a new messages notification or if one already exists
      if (location !== `/${user.username}/events`) {
        const newMessagesAlreadyExist = (
          eventsHosting.newMessagesExist || eventsAttending.newMessagesExist
        )

        if (!newMessagesAlreadyExist) {
          event.user.id === user.id
                ? toggleEventsHostingNewMessagesExist()
                : toggleEventsAttendingNewMessagesExist()
        }

      }
    }

    if (!user.hasNewInfo) {
      const location = history.location.pathname
      switch (location) {
        case `/${user.username}`:
        case `/${user.username}/events`:
        case `/${user.username}/events/${event.id}`:
          break
        default:
          // toggle user has new info to true if false -- will result in
          // 'new info' notification in nav bar
          toggleHasNewInfo()
          break
      }
    }

  }

  const allEvents = [...eventsHosting.events, ...eventsAttending.events]

  return (
    <Fragment>
      {
        allEvents.map(event => (
          <ActionCableConsumer
              key={ event.id }
              channel={ {channel: 'EventChatsChannel', event_id: event.id} }
              onReceived={ message => handleNewMessage(message, event) } />
          )
        )
      }
    </Fragment>
  )

}

const mapStateToProps = state => {
  return {
    user: state.user,
    eventsHosting: state.eventsHosting,
    eventsAttending: state.eventsAttending
  }
}

const mapDispatchToProps = {
  addEventHostingMessage,
  addEventAttendingMessage,
  addCurrentEventMessage,
  toggleEventsHostingNewMessagesExist,
  toggleEventsAttendingNewMessagesExist,
  toggleHasNewInfo
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventChatChannelCable))
