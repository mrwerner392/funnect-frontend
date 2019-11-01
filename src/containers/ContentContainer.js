import React, { Component } from 'react';

class ContentContainer extends Component {

  render() {
    return (
      <div id='content-container'>
        { this.props.content }
      </div>
    )
  }

}

export default ContentContainer
