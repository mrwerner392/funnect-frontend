import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileInfo from '../components/ProfileInfo';

class ContentDisplay extends Component {

  renderContent = () => {
    const { user } = this.props
    switch (this.props.contentType) {
      case 'user':
        return <ProfileInfo user={ user } />
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
