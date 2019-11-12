import React, { Component } from 'react';

class Message extends Component {

  render() {
    console.log(this.props);
    const { message: {content, sender} } = this.props

    return (
      <div className='message'>
        { <p><span>{ `${sender}: ` }</span>{ content }</p> }
      </div>
    )
  }

}

export default Message
