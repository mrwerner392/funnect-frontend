import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class EventNotification extends Component {

  render() {
    return (
      <div>HI</div>
    )
  }

}

const mapStateToProps = state => {

}

export default withRouter(connect()(EventNotification))
