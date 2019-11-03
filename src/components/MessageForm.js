import React, { Component } from 'react';


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

  }

  render() {
    const { state: {content}, handleChange, onSubmit } = this

    return (
      <form>
        <input type='text' name='content' value={ content } onChange={ handleChange } />
        <input type='submit' />
      </form>
    )
  }

}

export default MessageForm
