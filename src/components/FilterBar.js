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
      history.push(`${user.username}/posts`)
    } else {
      if (eventsHostingNewMessagesExist) {
        toggleEventsHostingNewMessagesExist()
      } else if (eventsAttendingNewMessagesExist) {
        toggleEventsAttendingNewMessagesExist()
      }
      history.push(`${user.username}/events`)
    }
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

  renderNewMessagesNotification = () => {
    const { eventsHostingNewMessagesExist, eventsAttendingNewMessagesExist} = this.props
    const showNotification = (
      eventsHostingNewMessagesExist || eventsAttendingNewMessagesExist
    )

    return showNotification ? '(New Messages)' : null
  }

  renderUserFilterBar = () => {
    // buttons here for page redirect, not actual filtering
    const { props: {user: {username}},
            handleUserFilterClick,
            renderNewInterestedUsersNotification,
            renderNewMessagesNotification } = this
    return (
      <Fragment>
        <button className='user-filter' onClick={ () => handleUserFilterClick('user-posts') }>Posts { renderNewInterestedUsersNotification() }</button>
        <button className='user-filter' onClick={ () => handleUserFilterClick('user-events') }>Events { renderNewMessagesNotification() }</button>
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
    const { props: {topics}, handleAvailablePostsFilterChange } = this
    return (
      <select className='available-filter'
              name='topics'
              onChange={ handleAvailablePostsFilterChange }
              >
        { topics.map(topic => <option className='available-filter-option' key={ topic.id } value={ topic.name }>{ topic.name }</option>) }
      </select>
    )
  }

  renderAvailablePostsNeighborhoodFilter = () => {
    const { props: {neighborhoods}, handleAvailablePostsFilterChange } = this
    return (
      <select className='available-filter'
              name='neighborhoods'
              onChange={ handleAvailablePostsFilterChange }
              >
        { neighborhoods.map(neighborhood => <option className='available-filter-option' key={ neighborhood.id } value={ neighborhood.name }>{ neighborhood.name }</option>) }
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
      <Fragment>
        <button className='posts-events-filter' value='active' onClick={ handleMyPostsOrEventsFilterClick }>Active</button>
        <button className='posts-events-filter' value='past' onClick={ handleMyPostsOrEventsFilterClick }>Past</button>
      </Fragment>
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
    newInterestedUsersExist: state.createdPosts.newInterestedUsersExist,
    eventsHostingNewMessagesExist: state.eventsHosting.newMessagesExist,
    eventsAttendingNewMessagesExist: state.eventsAttending.newMessagesExist
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
