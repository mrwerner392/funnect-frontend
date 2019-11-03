import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileInfo from '../components/ProfileInfo';

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
        <div>
          <p>{ post.topic.name }</p>
          <p>{ post.neighborhood.name }</p>
          <p>{ post.user.username }</p>
        </div>
      )
    })
  }

  renderMyPosts = () => {
    const { renderCreatedPosts, renderPostsInterestedIn } = this

    return (
      <div>
        { renderCreatedPosts() }
        { renderPostsInterestedIn() }
      </div>
    )
  }

  renderCreatedPosts = () => {
    const { createdPosts, createdPostsFilter } = this.props
    const posts = createdPosts.filter(post => post.status === createdPostsFilter)

    return posts.map(post => {
      return (
        <div>
          <p>{ post.topic.name }</p>
          <p>{ post.neighborhood.name }</p>
          <p>{ post.user.username }</p>
          <p>{ post.status }</p>
        </div>
      )
    })
  }

  renderPostsInterestedIn = () => {
    const { postsInterestedIn, postsInterestedInFilter } = this.props
    const posts = postsInterestedIn.filter(post => post.status === postsInterestedInFilter)

    return posts.map(post => {
      return (
        <div>
          <p>{ post.topic.name }</p>
          <p>{ post.neighborhood.name }</p>
          <p>{ post.user.username }</p>
          <p>{ post.status }</p>
        </div>
      )
    })
  }

  renderMyEvents = () => {
    const { renderEventsHosting, renderEventsAttending } = this

    return (
      <div>
        { renderEventsHosting() }
        { renderEventsAttending() }
      </div>
    )
  }

  renderEventsHosting = () => {
    const { eventsHosting, eventsHostingFilter } = this.props
    const events = eventsHosting.filter(event => event.status === eventsHostingFilter)

    return events.map(event => {
      return (
        <div>
          <p>{ event.description }</p>
          <p>{ event.location }</p>
          <p>{ `${event.time_hour}:${event.time_minute} ${event.time_am_pm}` }</p>
          <p>{ event.status }</p>
        </div>
      )
    })
  }

  renderEventsAttending = () => {
    const { eventsAttending, eventsAttendingFilter } = this.props
    const events = eventsAttending.filter(event => event.status === eventsAttendingFilter)

    return events.map(event => {
      return (
        <div>
          <p>{ event.description }</p>
          <p>{ event.location }</p>
          <p>{ `${event.time_hour}:${event.time_minute} ${event.time_am_pm}` }</p>
          <p>{ event.status }</p>
        </div>
      )
    })
  }


  renderContent = () => {
    const { props: {user, contentType},
            renderAvailablePosts,
            renderMyPosts,
            renderMyEvents } = this

    switch (contentType) {
      case 'user':
        return <ProfileInfo user={ user } />
      case 'user-posts':
        return renderMyPosts()
      case 'user-events':
        return renderMyEvents()
      case 'posts':
        return renderAvailablePosts()
      default:
        return <div>not found</div>
    }
  }


  render() {
    return (
      <div id='content-display'>
        { this.renderContent() }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user,
    availablePosts: state.availablePosts.posts,
    topicFilter: state.availablePosts.topicFilter,
    neighborhoodFilter: state.availablePosts.neighborhoodFilter,
    createdPosts: state.createdPosts.posts,
    createdPostsFilter: state.createdPosts.filter,
    postsInterestedIn: state.postsInterestedIn.posts,
    postsInterestedInFilter: state.postsInterestedIn.filter,
    eventsHosting: state.eventsHosting.events,
    eventsHostingFilter: state.eventsHosting.filter,
    eventsAttending: state.eventsAttending.events,
    eventsAttendingFilter: state.eventsAttending.filter
  }
}

export default connect(mapStateToProps)(ContentDisplay)
