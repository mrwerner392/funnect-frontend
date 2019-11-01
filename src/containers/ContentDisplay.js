import React, { Component } from 'react';
import { connect } from 'react-redux';

class ContentDisplay extends Component {

  renderContent = () => {
    switch (this.props.contentType) {
      case 'user':
        return <div>user</div>
      case 'user-posts':
        return <div>user-posts</div>
      case 'user-events':
        return <div>user-events</div>
      case 'posts':
        return <div>all-posts</div>
      default:
        return <div>not found</div>
    }
  }

  render() {
    return (
      <div id='content-display'>
        { this.renderContent() }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(ContentDisplay)
