import React, { Component } from 'react';

class ContentDisplay extends Component {

  render() {
    return (
      <div id='content-display'>
        ContentDisplay for { this.props.contentType }
      </div>
    )
  }

}

export default ContentDisplay
