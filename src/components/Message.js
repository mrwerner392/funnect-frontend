import React, { Component } from 'react';

class Message extends Component {

  render() {
    const { message: {content, sender} } = this.props

    return (
      <div className='message'>
        { <p><span>{ `${sender}: ` }</span>{ content }</p> }
      </div>
    )
  }

}

export default Message
