import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCreatedPostsFilter } from '../actions/myCreatedPostsActions';
import { setPostsInterestedInFilter } from '../actions/postsImInterestedInActions';
import { setEventsHostingFilter } from '../actions/eventsImHostingActions';
import { setEventsAttendingFilter } from '../actions/eventsImAttendingActions';
import { clearAvailablePostsFilter } from '../actions/availablePostsActions';

const  SubFilterBar = props => {

  const { user,
          contentType,
          postFilter,
          eventFilter,
          clearAvailablePostsFilter,
          setCreatedPostsFilter,
          setPostsInterestedInFilter,
          setEventsHostingFilter,
          setEventsAttendingFilter,
          history } = props

  const handleEditProfileClick = () => {
    history.push(`/${user.username}/edit`)
  }

  const handleClearFilterClick = () => {
    clearAvailablePostsFilter()
  }

  const handleMyPostsOrEventsSubFilterClick = filter => {
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

  const renderUserSubFilterBar = () => {
    return <button className='user-sub-filter' onClick={ handleEditProfileClick }>Edit Profile</button>
  }

  const renderAvailablePostsSubFilterBar = () => {
    return <button className='clear-filter-button' onClick={ handleClearFilterClick }>Clear Filters</button>
  }

  const renderMyPostsOrEventsSubFilterBar = () => {
    const filter = contentType === 'user-posts' ? postFilter : eventFilter

    return (
      <Fragment>
        <div className='user-sub-filter'
              onClick={ () => handleMyPostsOrEventsSubFilterClick('active') }>
          <button className={ filter === 'active'
                                      ? 'posts-events-sub-filter active-button sub-filter-active'
                                      : 'posts-events-sub-filter active-button' }
                  >
            Active { contentType === 'user-posts' ? 'Posts' : 'Events' }
          </button>
        </div>
        <div className='user-sub-filter'
              onClick={ () => handleMyPostsOrEventsSubFilterClick('past') }>
          <button className={ filter === 'past'
                                      ? 'posts-events-sub-filter past-button sub-filter-active'
                                      : 'posts-events-sub-filter past-button' }
                  >
            Old { contentType === 'user-posts' ? 'Posts' : 'Events' }
          </button>
        </div>
      </Fragment>
    )
  }

  const renderSubFilterBar = () => {
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

  return (
    <div id='sub-filter-bar'>
      { renderSubFilterBar() }
    </div>
  )

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
