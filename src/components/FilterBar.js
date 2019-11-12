import React, { Component, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAvailablePostsTopicFilter, setAvailablePostsNeighborhoodFilter } from '../actions/availablePostsActions';
import { setCreatedPostsFilter, toggleNewInterestedUsersExist } from '../actions/myCreatedPostsActions';
import { setPostsInterestedInFilter } from '../actions/postsImInterestedInActions';
import { setEventsHostingFilter, toggleEventsHostingNewMessagesExist } from '../actions/eventsImHostingActions';
import { setEventsAttendingFilter, toggleEventsAttendingNewMessagesExist } from '../actions/eventsImAttendingActions';
import { setContentType } from '../actions/contentTypeActions';

class FilterBar extends Component {

  handleUserFilterClick = contentType => {
    const { user,
            history,
            setContentType,
            newInterestedUsersExist,
            toggleNewInterestedUsersExist,
            eventsHostingNewMessagesExist,
            eventsAttendingNewMessagesExist,
            toggleEventsHostingNewMessagesExist,
            toggleEventsAttendingNewMessagesExist } = this.props

    setContentType(contentType)

    if (contentType === 'user-posts') {
      if (newInterestedUsersExist) {
        toggleNewInterestedUsersExist()
      }
      history.push(`/${user.username}/posts`)
    } else {
      if (eventsHostingNewMessagesExist) {
        toggleEventsHostingNewMessagesExist()
      } else if (eventsAttendingNewMessagesExist) {
        toggleEventsAttendingNewMessagesExist()
      }
      history.push(`/${user.username}/events`)
    }
  }

  handleAvailablePostsFilterChange = evt => {
    const { name, value } = evt.target
    const { setAvailablePostsTopicFilter, setAvailablePostsNeighborhoodFilter } = this.props
    name === 'topics'
        ? setAvailablePostsTopicFilter(value)
        : setAvailablePostsNeighborhoodFilter(value)
  }

  renderNewInterestedUsersNotification = () => {
    const { newInterestedUsersExist } = this.props
    return newInterestedUsersExist ? '(New Interested Users)' : null
  }

  renderNewMessagesNotification = () => {
    const { eventsHostingNewMessagesExist, eventsAttendingNewMessagesExist} = this.props
    const showNotification = (
      eventsHostingNewMessagesExist || eventsAttendingNewMessagesExist
    )

    return showNotification ? '(New Messages)' : null
  }

  renderUserFilterBar = () => {
    // buttons here for page redirect, not actual filtering
    const { props: {user: {username}, contentType},
            handleUserFilterClick,
            renderNewInterestedUsersNotification,
            renderNewMessagesNotification } = this

    return (
      <Fragment>
        <div className='user-filter'
              onClick={ () => handleUserFilterClick('user-posts') }>
          <button className={ contentType === 'user-posts' ? 'user-filter-button filter-active' : 'user-filter-button' }>
            My Posts { renderNewInterestedUsersNotification() }
          </button>
        </div>
        <div className='user-filter'
              onClick={ () => handleUserFilterClick('user-events') }>
          <button className={ contentType === 'user-events' ? 'user-filter-button filter-active' : 'user-filter-button' }>
            My Events { renderNewMessagesNotification() }
          </button>
        </div>
      </Fragment>
    )
  }

  renderAvailablePostsFilterBar = () => {
    const { renderAvailablePostsTopicFilter,
            renderAvailablePostsNeighborhoodFilter } = this
    return (
      <Fragment>
        { renderAvailablePostsTopicFilter() }
        { renderAvailablePostsNeighborhoodFilter() }
      </Fragment>
    )
  }

  renderAvailablePostsTopicFilter = () => {
    const { props: {topics, topicFilter},
            handleAvailablePostsFilterChange } = this

    return (
      <select className='available-filter'
              name='topics'
              value={ topicFilter }
              onChange={ handleAvailablePostsFilterChange }
              >
        <option className='available-filter-option' value=''>Filter By Topic</option>
        { topics.map(topic => <option className='available-filter-option' key={ topic.id } value={ topic.name }>{ topic.name }</option>) }
      </select>
    )
  }

  renderAvailablePostsNeighborhoodFilter = () => {
    const { props: {neighborhoods, neighborhoodFilter},
            handleAvailablePostsFilterChange } = this

    return (
      <select className='available-filter'
              name='neighborhoods'
              value={ neighborhoodFilter }
              onChange={ handleAvailablePostsFilterChange }
              >
        <option className='available-filter-option' value=''>Filter By Neighborhood</option>
        { neighborhoods.map(neighborhood => <option className='available-filter-option' key={ neighborhood.id } value={ neighborhood.name }>{ neighborhood.name }</option>) }
      </select>
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
      case 'user-posts':
      case 'user-events':
        return renderUserFilterBar()
      case 'posts':
        return renderAvailablePostsFilterBar()
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
    newInterestedUsersExist: state.createdPosts.newInterestedUsersExist,
    eventsHostingNewMessagesExist: state.eventsHosting.newMessagesExist,
    eventsAttendingNewMessagesExist: state.eventsAttending.newMessagesExist,
    topicFilter: state.availablePosts.topicFilter,
    neighborhoodFilter: state.availablePosts.neighborhoodFilter
  }
}

const mapDispatchToProps = {
  setAvailablePostsTopicFilter,
  setAvailablePostsNeighborhoodFilter,
  setContentType,
  setCreatedPostsFilter,
  setPostsInterestedInFilter,
  setEventsHostingFilter,
  setEventsAttendingFilter,
  toggleNewInterestedUsersExist,
  toggleEventsHostingNewMessagesExist,
  toggleEventsAttendingNewMessagesExist
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterBar))
