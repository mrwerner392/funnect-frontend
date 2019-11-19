import React from 'react';
import { connect } from 'react-redux';
import { newEventAttending } from 'eventsImAttendingActions';

const EventChannelCable = ({ user, newEventAttending }) => {

  const handleNewEvent = event => {
    const { user, newEventAttending } = this.props
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
