import React, { Component } from 'react';

const Message = ({ message: {content, sender} }) => {

  return (
    <div className='message'>
      { <p><span>{ `${sender}: ` }</span>{ content }</p> }
    </div>
  )

}

export default Message
