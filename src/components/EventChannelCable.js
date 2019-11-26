import React from 'react';
import { connect } from 'react-redux';
import { newEventAttending } from '../actions/eventsImAttendingActions';
import { ActionCableConsumer } from 'react-actioncable-provider';

// Action Cable for all events web socket channel
const EventChannelCable = ({ user, newEventAttending }) => {

  // update redux state with new event if this user was invited
  const handleNewEvent = event => {
    const attendingIds = event.users_attending.map(user => user.id)
    if (attendingIds.includes(user.id)) {
      newEventAttending(event)
    }
  }

  return (
    <ActionCableConsumer
        channel={ {channel: 'EventsChannel'} }
        onReceived={ handleNewEvent }/>
  )

}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  newEventAttending
}

export default connect(mapStateToProps, mapDispatchToProps)(EventChannelCable)
