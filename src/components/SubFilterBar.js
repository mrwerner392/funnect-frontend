import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class SubFilterBar extends Component {

  renderUserSubFilterBar = () => {
    return (
      {/*<Fragment>
        <button className='user-sub-filter-button'>Edit Profile</button>
      </Fragment>*/}
    )
  }

  renderSubFilterBar = () => {
    const { props: {contentType},
            renderUserSubFilterBar,
            renderAvailablePostsSubFilterBar,
            renderMyPostsOrEventsSubFilterBar } = this

    switch (contentType) {
      case 'user':
        return renderUserSubFilterBar()
      case 'posts':
        return renderAvailablePostsSubFilterBar()
      case 'user-posts':
      case 'user-events':
        return renderMyPostsOrEventsSubFilterBar()
      default:
        return null
    }
  }

  render() {
    const { props: {user, contentType}, renderSubFilterBar } = this

    return (
      <div id='sub-filter-bar'>
        { renderSubFilterBar() }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user,
    contentType: state.contentType
  }
}

export default withRouter(connect()(SubFilterBar))
