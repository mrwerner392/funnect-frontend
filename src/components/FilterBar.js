import React, { Component, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAvailablePostsTopicFilter, setAvailablePostsNeighborhoodFilter } from '../actions/availablePostsActions';
import { setCreatedPostsFilter } from '../actions/myCreatedPostsActions';
import { setPostsInterestedInFilter } from '../actions/postsImInterestedInActions';
import { setEventsHostingFilter } from '../actions/eventsImHostingActions';
import { setEventsAttendingFilter } from '../actions/eventsImAttendingActions';
import { setContentType } from '../actions/contentTypeActions';

class FilterBar extends Component {

  handleUserFilterClick = contentType => {
    const { user, history, setContentType } = this.props
    setContentType(contentType)
    contentType === 'user-posts'
      ? history.push(`${user.username}/posts`)
      : history.push(`${user.username}/events`)
  }

  handleMyPostsOrEventsFilterClick = evt => {
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

  renderNewInterestedUsersNotification = () => {
    const { newInterestedUsersExist } = this.props
    return newInterestedUsersExist ? '(New Interested Users)' : null
  }

  renderUserFilterBar = () => {
    // buttons here for page redirect, not actual filtering
    const { props: {user: {username}},
            handleUserFilterClick,
            renderNewInterestedUsersNotification } = this
    return (
      <div>
        <button onClick={ () => handleUserFilterClick('user-posts') }>Posts { renderNewInterestedUsersNotification() }</button>
        <button onClick={ () => handleUserFilterClick('user-events') }>Events</button>
      </div>
    )
  }

  renderAvailablePostsFilterBar = () => {
    const { renderAvailablePostsTopicFilter,
            renderAvailablePostsNeighborhoodFilter } = this
    return (
      <div>
        <Fragment>
          Topic Filter: { renderAvailablePostsTopicFilter() }
        </Fragment>
        <Fragment>
          Topic Filter: { renderAvailablePostsNeighborhoodFilter() }
        </Fragment>
      </div>
    )
  }

  renderAvailablePostsTopicFilter = () => {
    const { props: {topics}, handleAvailablePostsFilterChange } = this
    return (
      <select name='topics' onChange={ handleAvailablePostsFilterChange }>
        { topics.map(topic => <option key={ topic.id } value={ topic.name }>{ topic.name }</option>) }
      </select>
    )
  }

  renderAvailablePostsNeighborhoodFilter = () => {
    const { props: {neighborhoods}, handleAvailablePostsFilterChange } = this
    return (
      <select name='neighborhoods' onChange={ handleAvailablePostsFilterChange }>
        { neighborhoods.map(neighborhood => <option key={ neighborhood.id } value={ neighborhood.name }>{ neighborhood.name }</option>) }
      </select>
    )
  }

  handleAvailablePostsFilterChange = evt => {
    const { name, value } = evt.target
    const { setAvailablePostsTopicFilter, setAvailablePostsNeighborhoodFilter } = this.props
    name === 'topics'
      ? setAvailablePostsTopicFilter(value)
      : setAvailablePostsNeighborhoodFilter(value)
  }

  renderMyPostsOrEventsFilterBar = () => {
    const { handleMyPostsOrEventsFilterClick } = this
    return (
      <div>
        <button className='filter-button' value='active' onClick={ handleMyPostsOrEventsFilterClick }>Active</button>
        <button className='filter-button' value='past' onClick={ handleMyPostsOrEventsFilterClick }>Past</button>
      </div>
    )
  }

  renderFilterBar = () => {
    const { props: {contentType},
            renderUserFilterBar,
            renderAvailablePostsFilterBar,
            renderMyPostsOrEventsFilterBar,
            renderMyEventsFilterBar } = this

    switch (contentType) {
      case 'user':
        return renderUserFilterBar()
      case 'posts':
        return renderAvailablePostsFilterBar()
      case 'user-posts':
      case 'user-events':
        return renderMyPostsOrEventsFilterBar()
      default:
        return null
    }
  }

  render() {
    const { renderFilterBar } = this

    return (
      <div id='filter-bar'>
        { renderFilterBar() }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user,
    topics: state.topics,
    neighborhoods: state.neighborhoods,
    contentType: state.contentType,
    newInterestedUsersExist: state.createdPosts.newInterestedUsersExist
  }
}

const mapDispatchToProps = {
  setAvailablePostsTopicFilter,
  setAvailablePostsNeighborhoodFilter,
  setContentType,
  setCreatedPostsFilter,
  setPostsInterestedInFilter,
  setEventsHostingFilter,
  setEventsAttendingFilter
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterBar))
