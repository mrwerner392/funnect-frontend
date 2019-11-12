import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class SubFilterBar extends Component {

  handleEditProfileClick = () => {
    const { user: {username}, history } = this.props
    history.push(`/${username}/edit`)
  }

  renderUserSubFilterBar = () => {
    const { handleEditProfileClick } = this
    return (
      <button id='user-sub-filter' onClick={ handleEditProfileClick }>Edit Profile</button>
    )
  }

  renderAvailablePostsSubFilterBar = () => {
    return <button className='clear-filter-button'>Clear Filters</button>
  }

  renderMyPostsOrEventsSubFilterBar = () => {
    const { contentType } = this.props
    return (
      <Fragment>
        <button className='active-button'>Active { contentType === 'user-posts' ? 'Posts' : 'Events' }</button>
        <button className='past-button'>Old { contentType === 'user-posts' ? 'Posts' : 'Events' }</button>
      </Fragment>
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

export default withRouter(connect(mapStateToProps)(SubFilterBar))
