import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileInfo from '../components/ProfileInfo';
import ProfileInfoEditForm from '../components/ProfileInfoEditForm';
import Post from '../components/Post';
import Event from '../components/Event';
import { showPostsWaiting } from '../actions/availablePostsActions'

const ContentDisplay = props => {

  const { user,
          contentType,
          availablePosts,
          createdPosts,
          createdPostsFilter,
          postsInterestedIn,
          postsInterestedInFilter,
          eventsHosting,
          eventsHostingFilter,
          eventsAttending,
          eventsAttendingFilter,
          topicFilter,
          neighborhoodFilter,
          postsWaiting,
          showPostsWaiting } = props

  const renderAvailablePosts = () => {
    const topicFilteredPosts = topicFilter
      ? availablePosts.filter(post => post.topic.name === topicFilter)
      : availablePosts

    const neighborhoodAndTopicFilteredPosts = neighborhoodFilter
      ? topicFilteredPosts.filter(post => post.neighborhood.name === neighborhoodFilter)
      : topicFilteredPosts

    return neighborhoodAndTopicFilteredPosts.map(post => {
      return (
        <Post key={ post.id } post={ post } />
      )
    })
  }

  const renderMyPosts = () => {
    return (
      <Fragment>
        { renderCreatedPosts() }
        { renderPostsInterestedIn() }
      </Fragment>
    )
  }

  const renderCreatedPosts = () => {
    const posts = createdPosts.filter(post => post.status === createdPostsFilter)

    return posts.map(post => <Post key={ post.id } post={ post } />)
  }

  const renderPostsInterestedIn = () => {
    const posts = postsInterestedIn.filter(post => post.status === postsInterestedInFilter)

    return posts.map(post => <Post key={ post.id } post={ post } />)
  }

  const renderMyEvents = () => {
    return (
      <Fragment>
        { renderEventsHosting() }
        { renderEventsAttending() }
      </Fragment>
    )
  }

  const renderEventsHosting = () => {
    const events = eventsHosting.filter(event => event.status === eventsHostingFilter)

    return events.map(event => <Event key={ event.id } event={ event } />)
  }

  const renderEventsAttending = () => {
    const events = eventsAttending.filter(event => event.status === eventsAttendingFilter)

    return events.map(event => <Event key={ event.id } event={ event } />)
  }

  const handleNewPostsNotificationClick = () => {
    showPostsWaiting()
  }

  const renderNewPostsNotification = () => {
    return postsWaiting.length
            ? <button id='new-posts-button' onClick={ handleNewPostsNotificationClick }>{ `${postsWaiting.length} new posts`}</button>
            : null
  }

  const renderContent = () => {
    switch (contentType) {
      case 'user':
        return <ProfileInfo />
      case 'user-edit':
        return <ProfileInfoEditForm />
      case 'user-posts':
        return renderMyPosts()
      case 'user-events':
        return renderMyEvents()
      case 'posts':
        return renderAvailablePosts()
      default:
        return <div>Loading...</div>
    }
  }

  return (
    <div id='content-display'>
      { contentType === 'posts' ? renderNewPostsNotification() : null }
      { renderContent() }
    </div>
  )

}

const mapStateToProps = state => {
  return {
    user: state.user,
    availablePosts: state.availablePosts.posts,
    postsWaiting: state.availablePosts.postsWaiting,
    topicFilter: state.availablePosts.topicFilter,
    neighborhoodFilter: state.availablePosts.neighborhoodFilter,
    createdPosts: state.createdPosts.posts,
    createdPostsFilter: state.createdPosts.filter,
    postsInterestedIn: state.postsInterestedIn.posts,
    postsInterestedInFilter: state.postsInterestedIn.filter,
    eventsHosting: state.eventsHosting.events,
    eventsHostingFilter: state.eventsHosting.filter,
    eventsAttending: state.eventsAttending.events,
    eventsAttendingFilter: state.eventsAttending.filter,
    contentType: state.contentType
  }
}

const mapDispatchToProps = {
  showPostsWaiting
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentDisplay)
