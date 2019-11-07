import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newMessageOnEventImHosting } from '../actions/eventsImHostingActions'
import { newMessageOnEventImAttending } from '../actions/eventsImAttendingActions'

const URL = 'http://localhost:3000'

class MessageForm extends Component {

  state = {
    content: '',
    errors: null
  }

  handleChange = evt => {
    this.setState({
      content: evt.target.value
    })
  }

  handleSubmit = evt => {
    evt.preventDefault();
    const { state: {content}, props: {currentEvent} } = this
    console.log(content, currentEvent);
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.token
      },
      body: JSON.stringify({user_id: localStorage.id, event_id: currentEvent.id, content})
    }

    fetch(URL + '/messages', config)
    .then(res => res.json())
    .then(response => {
      if (response.errors) {
        this.setState({
          errors: response.errors
        })
      }
    })
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

const mapStateToProps = state => {
  return {
    currentEvent: state.currentEvent
  }
}

export default connect(mapStateToProps)(MessageForm)
