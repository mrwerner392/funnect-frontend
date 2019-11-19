import React from 'react';
import { connect } from 'react-redux';
import { newEventAttending } from '../actions/eventsImAttendingActions';
import { ActionCableConsumer } from 'react-actioncable-provider';

const EventChannelCable = ({ user, newEventAttending }) => {

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
