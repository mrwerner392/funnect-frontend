import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCreatedPostsFilter } from '../actions/myCreatedPostsActions';
import { setPostsInterestedInFilter } from '../actions/postsImInterestedInActions';
import { setEventsHostingFilter } from '../actions/eventsImHostingActions';
import { setEventsAttendingFilter } from '../actions/eventsImAttendingActions';
import { clearAvailablePostsFilter } from '../actions/availablePostsActions';

class SubFilterBar extends Component {

  handleEditProfileClick = () => {
    const { user: {username}, history } = this.props
    history.push(`/${username}/edit`)
  }

  handleClearFilterClick = () => {
    const { clearAvailablePostsFilter } = this.props
    clearAvailablePostsFilter()
  }

  handleMyPostsOrEventsSubFilterClick = filter => {
    const { props: {contentType,
                    setCreatedPostsFilter,
                    setPostsInterestedInFilter,
                    setEventsHostingFilter,
                    setEventsAttendingFilter} } = this

    switch (contentType) {
      case 'user-posts':
        setCreatedPostsFilter(filter)
        setPostsInterestedInFilter(filter)
        break
      case 'user-events':
        setEventsHostingFilter(filter)
        setEventsAttendingFilter(filter)
        break
      default:
        break
    }
  }

  renderUserSubFilterBar = () => {
    const { handleEditProfileClick } = this
    return (
        <button className='user-sub-filter' onClick={ handleEditProfileClick }>Edit Profile</button>
    )
  }

  renderAvailablePostsSubFilterBar = () => {
    const { handleClearFilterClick } = this
    return <button className='clear-filter-button' onClick={ handleClearFilterClick }>Clear Filters</button>
  }

  renderMyPostsOrEventsSubFilterBar = () => {
    const { props: {contentType, postFilter, eventFilter},
            handleMyPostsOrEventsSubFilterClick } = this
    const filter = contentType === 'user-posts' ? postFilter : eventFilter

    return (
      <Fragment>
        <div className='user-sub-filter'
              onClick={ () => handleMyPostsOrEventsSubFilterClick('active') }>
          <button className={ filter === 'active' ? 'posts-events-sub-filter active-button sub-filter-active' : 'posts-events-sub-filter active-button' }
                  >
            Active { contentType === 'user-posts' ? 'Posts' : 'Events' }
          </button>
        </div>
        <div className='user-sub-filter'
              onClick={ () => handleMyPostsOrEventsSubFilterClick('past') }>
          <button className={ filter === 'past' ? 'posts-events-sub-filter past-button sub-filter-active' : 'posts-events-sub-filter past-button' }
                  >
            Old { contentType === 'user-posts' ? 'Posts' : 'Events' }
          </button>
        </div>
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
    contentType: state.contentType,
    postFilter: state.postsInterestedIn.filter,
    eventFilter: state.eventsHosting.filter
  }
}

const mapDispatchToProps = {
  setCreatedPostsFilter,
  setPostsInterestedInFilter,
  setEventsHostingFilter,
  setEventsAttendingFilter,
  clearAvailablePostsFilter
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubFilterBar))
