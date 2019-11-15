import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileInfo from '../components/ProfileInfo';
import ProfileInfoEditForm from '../components/ProfileInfoEditForm';
import Post from '../components/Post';
import Event from '../components/Event';
import { showPostsWaiting } from '../actions/availablePostsActions'

class ContentDisplay extends Component {

  renderAvailablePosts = () => {
    let { availablePosts, topicFilter, neighborhoodFilter } = this.props

    availablePosts = topicFilter
      ? availablePosts.filter(post => post.topic.name === topicFilter)
      : availablePosts

    availablePosts = neighborhoodFilter
      ? availablePosts.filter(post => post.neighborhood.name === neighborhoodFilter)
      : availablePosts

    return availablePosts.map(post => {
      return (
        <Post key={ post.id } post={ post } />
      )
    })
  }

  renderMyPosts = () => {
    const { renderCreatedPosts, renderPostsInterestedIn } = this

    return (
      <Fragment>
        { renderCreatedPosts() }
        { renderPostsInterestedIn() }
      </Fragment>
    )
  }

  renderCreatedPosts = () => {
    const { user, createdPosts, createdPostsFilter } = this.props
    const posts = createdPosts.filter(post => post.status === createdPostsFilter)

    return posts.map(post => {
      return (
        <Post key={ post.id } post={ post } />
      )
    })
  }

  renderPostsInterestedIn = () => {
    const { postsInterestedIn, postsInterestedInFilter } = this.props
    const posts = postsInterestedIn.filter(post => post.status === postsInterestedInFilter)

    return posts.map(post => <Post key={ post.id } post={ post } />)
  }

  renderMyEvents = () => {
    const { renderEventsHosting, renderEventsAttending } = this

    return (
      <Fragment>
        { renderEventsHosting() }
        { renderEventsAttending() }
      </Fragment>
    )
  }

  renderEventsHosting = () => {
    const { user, eventsHosting, eventsHostingFilter } = this.props
    const events = eventsHosting.filter(event => event.status === eventsHostingFilter)

    return events.map(event => <Event key={ event.id } event={ event } />)
  }

  renderEventsAttending = () => {
    const { user, eventsAttending, eventsAttendingFilter } = this.props
    const events = eventsAttending.filter(event => event.status === eventsAttendingFilter)

    return events.map(event => <Event key={ event.id } event={ event } />)
  }

  handleNewPostsNotificationClick = () => {
    const { showPostsWaiting } = this.props
    showPostsWaiting()
  }

  renderNewPostsNotification = () => {
    const { props: {postsWaiting}, handleNewPostsNotificationClick } = this
    return postsWaiting.length
            ? <button onClick={ handleNewPostsNotificationClick }>{ `${postsWaiting.length} new posts`}</button>
            : null
  }

  renderContent = () => {
    const { props: {user, contentType},
            renderAvailablePosts,
            renderMyPosts,
            renderMyEvents } = this

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


  render() {
    const { props: {contentType},
            renderNewPostsNotification,
            renderContent } = this

    return (
      <div id='content-display'>
        { contentType === 'posts' ? renderNewPostsNotification() : null }
        { renderContent() }
      </div>
    )
  }

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
