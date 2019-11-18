import React, { Component, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAvailablePostsTopicFilter, setAvailablePostsNeighborhoodFilter } from '../actions/availablePostsActions';
import { toggleNewInterestedUsersExist } from '../actions/myCreatedPostsActions';
import { toggleEventsHostingNewMessagesExist } from '../actions/eventsImHostingActions';
import { toggleEventsAttendingNewMessagesExist } from '../actions/eventsImAttendingActions';
import { setContentType } from '../actions/contentTypeActions';

const FilterBar = props => {

  const { user,
          contentType,
          setContentType,
          topics,
          topicFilter,
          neighborhoods,
          neighborhoodFilter,
          newInterestedUsersExist,
          toggleNewInterestedUsersExist,
          eventsHostingNewMessagesExist,
          eventsAttendingNewMessagesExist,
          toggleEventsHostingNewMessagesExist,
          toggleEventsAttendingNewMessagesExist,
          setAvailablePostsTopicFilter,
          setAvailablePostsNeighborhoodFilter,
          history } = props

  const handleUserFilterClick = contentType => {
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

  const handleAvailablePostsFilterChange = evt => {
    const { name, value } = evt.target
    name === 'topics'
        ? setAvailablePostsTopicFilter(value)
        : setAvailablePostsNeighborhoodFilter(value)
  }

  const renderNewInterestedUsersNotification = () => {
    return newInterestedUsersExist
              ? <span id='new-interesteds'>(New Interesteds)</span>
              : null
  }

  const renderNewMessagesNotification = () => {
    const showNotification = eventsHostingNewMessagesExist || eventsAttendingNewMessagesExist

    return showNotification
              ? <span id='new-messages'>(New Messages)</span>
              : null
  }

  const renderUserFilterBar = () => {
    // buttons here for page redirect, not actual filtering
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

  const renderAvailablePostsFilterBar = () => {
    return (
      <Fragment>
        { renderAvailablePostsTopicFilter() }
        { renderAvailablePostsNeighborhoodFilter() }
      </Fragment>
    )
  }

  const renderAvailablePostsTopicFilter = () => {
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

  const renderAvailablePostsNeighborhoodFilter = () => {
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

  const renderFilterBar = () => {
    switch (contentType) {
      case 'user':
      case 'user-posts':
      case 'user-events':
        return renderUserFilterBar()
      case 'posts':
        return renderAvailablePostsFilterBar()
      default:
        return null
    }
  }

  return (
    <div id='filter-bar'>
      { renderFilterBar() }
    </div>
  )

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
  toggleNewInterestedUsersExist,
  toggleEventsHostingNewMessagesExist,
  toggleEventsAttendingNewMessagesExist
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterBar))
