import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ProfileInfo from '../components/ProfileInfo';
import ProfileInfoEditForm from '../components/ProfileInfoEditForm';
import Post from '../components/Post';
import Event from '../components/Event';
import { showPostsWaiting } from '../actions/availablePostsActions'

const ContentDisplay = props => {

  const { contentType,
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

  // render the available posts accounting for filters
  const renderAvailablePosts = () => {
    const topicFilteredPosts = topicFilter
      ? availablePosts.filter(post => post.topic.name === topicFilter)
      : availablePosts

    const neighborhoodAndTopicFilteredPosts = neighborhoodFilter
      ? topicFilteredPosts.filter(post => post.neighborhood.name === neighborhoodFilter)
      : topicFilteredPosts

    return neighborhoodAndTopicFilteredPosts.map(post => <Post key={ post.id } post={ post } />)
  }

  // render the user's created posts and posts they're interested in
  const renderMyPosts = () => {
    return (
      <Fragment>
        { renderCreatedPosts() }
        { renderPostsInterestedIn() }
      </Fragment>
    )
  }

  const renderCreatedPosts = () => {
    // filter for active or old
    const posts = createdPosts.filter(post => post.status === createdPostsFilter)

    return posts.map(post => <Post key={ post.id } post={ post } />)
  }

  const renderPostsInterestedIn = () => {
    // filter for active or old
    const posts = postsInterestedIn.filter(post => post.status === postsInterestedInFilter)

    return posts.map(post => <Post key={ post.id } post={ post } />)
  }

  // render the events the user is hosting or attending
  const renderMyEvents = () => {
    return (
      <Fragment>
        { renderEventsHosting() }
        { renderEventsAttending() }
      </Fragment>
    )
  }

  const renderEventsHosting = () => {
    // filter for active or old
    const events = eventsHosting.filter(event => event.status === eventsHostingFilter)

    return events.map(event => <Event key={ event.id } event={ event } />)
  }

  const renderEventsAttending = () => {
    // filter for active or old
    const events = eventsAttending.filter(event => event.status === eventsAttendingFilter)

    return events.map(event => <Event key={ event.id } event={ event } />)
  }

  // if user clicks on 'new posts' button
  const handleNewPostsNotificationClick = () => {
    showPostsWaiting()
  }

  // show 'new posts' button
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
