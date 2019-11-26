import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCreatedPostsFilter } from '../actions/myCreatedPostsActions';
import { setPostsInterestedInFilter } from '../actions/postsImInterestedInActions';
import { setEventsHostingFilter } from '../actions/eventsImHostingActions';
import { setEventsAttendingFilter } from '../actions/eventsImAttendingActions';
import { clearAvailablePostsFilter } from '../actions/availablePostsActions';

// some pages have a second filter bar below the main filter bar
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

  // if user clicks 'edit profile'
  const handleEditProfileClick = () => {
    history.push(`/${user.username}/edit`)
  }

  // clears topic and neighborhood filters from available posts page
  const handleClearFilterClick = () => {
    clearAvailablePostsFilter()
  }

  // filter to either show active or old posts based on user click
    // if user is viewing their events or posts
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

  // on user profile page
  const renderUserSubFilterBar = () => {
    return <button className='user-sub-filter' onClick={ handleEditProfileClick }>Edit Profile</button>
  }

  // on main posts page
  const renderAvailablePostsSubFilterBar = () => {
    return <button className='clear-filter-button' onClick={ handleClearFilterClick }>Clear Filters</button>
  }

  // on user's posts or events pages
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
