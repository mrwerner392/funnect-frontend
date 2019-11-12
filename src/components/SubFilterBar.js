import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCreatedPostsFilter } from '../actions/myCreatedPostsActions'
import { setPostsInterestedInFilter } from '../actions/postsImInterestedInActions'
import { setEventsHostingFilter } from '../actions/eventsImHostingActions'
import { setEventsAttendingFilter } from '../actions/eventsImAttendingActions'

class SubFilterBar extends Component {

  handleEditProfileClick = () => {
    const { user: {username}, history } = this.props
    history.push(`/${username}/edit`)
  }



  handleMyPostsOrEventsSubFilterClick = evt => {
    const { props: {contentType,
                    setCreatedPostsFilter,
                    setPostsInterestedInFilter,
                    setEventsHostingFilter,
                    setEventsAttendingFilter} } = this

    const filter = evt.target.value

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
    return <button className='clear-filter-button'>Clear Filters</button>
  }

  renderMyPostsOrEventsSubFilterBar = () => {
    const { props: {contentType},
            handleMyPostsOrEventsSubFilterClick } = this

    return (
      <Fragment>
        <div className='user-sub-filter'
              onClick={ handleMyPostsOrEventsSubFilterClick }>
          <button className={ contentType === 'user-posts' ? 'posts-events-sub-filter active-button active' : 'posts-events-sub-filter active-button' }
                  value='active'
                  >
            Active { contentType === 'user-posts' ? 'Posts' : 'Events' }
          </button>
        </div>
        <div className='user-sub-filter'
              onClick={ handleMyPostsOrEventsSubFilterClick }>
          <button className={ contentType === 'user-posts' ? 'posts-events-sub-filter past-button' : 'posts-events-sub-filter past-button active' }
                  value='past'
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
    contentType: state.contentType
  }
}

const mapDispatchToProps = {
  setCreatedPostsFilter,
  setPostsInterestedInFilter,
  setEventsHostingFilter,
  setEventsAttendingFilter
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubFilterBar))
