import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newMessageOnEventImHosting } from '../actions/eventsImHostingActions'
import { newMessageOnEventImAttending } from '../actions/eventsImAttendingActions'

const URL = 'http://localhost:3000'

class MessageForm extends Component {

  state = {
    content: ''
  }

  handleChange = evt => {
    this.setState({
      content: evt.target.value
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const { state: {content}, props: {eventId} } = this
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.token
      },
      body: JSON.stringify({user_id: localStorage.id, event_id: eventId, content})
    }

    fetch(URL + '/messages', config)
    .then(res => res.json())
    // .then(console.log)
  }

  render() {
    const { state: {content}, handleChange, handleSubmit } = this

    return (
      <form onSubmit={ handleSubmit }>
        <input type='text' name='content' value={ content } onChange={ handleChange } />
        <input type='submit' />
      </form>
    )
  }

}

export default MessageForm
