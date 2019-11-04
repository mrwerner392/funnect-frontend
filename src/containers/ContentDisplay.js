import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileInfo from '../components/ProfileInfo';
import ProfileInfoEditForm from '../components/ProfileInfoEditForm'
import Post from '../components/Post'

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
        <Fragment>
          <Post key={ post.id } post={ post } />
          <NavLink exact to={ `/${user.username}/posts/${post.id}` }>View Details</NavLink>
        </Fragment>
      )
    })
  }

  renderPostsInterestedIn = () => {
    const { postsInterestedIn, postsInterestedInFilter } = this.props
    const posts = postsInterestedIn.filter(post => post.status === postsInterestedInFilter)

    return posts.map(post => {
      return (
        <Fragment>
          <Post key={ post.id } post={ post } />
        </Fragment>
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
    const { user, eventsHosting, eventsHostingFilter } = this.props
    const events = eventsHosting.filter(event => event.status === eventsHostingFilter)

    return events.map(event => {
      return (
        <div>
          <p>{ event.description }</p>
          <p>{ event.location }</p>
          <p>{ `${event.time_hour}:${event.time_minute} ${event.time_am_pm}` }</p>
          <p>{ event.status }</p>
          <NavLink exact to={ `/${user.username}/events/${event.id}` } >View Event</NavLink>
        </div>
      )
    })
  }

  renderEventsAttending = () => {
    const { user, eventsAttending, eventsAttendingFilter } = this.props
    const events = eventsAttending.filter(event => event.status === eventsAttendingFilter)

    return events.map(event => {
      return (
        <div>
          <p>{ event.description }</p>
          <p>{ event.location }</p>
          <p>{ `${event.time_hour}:${event.time_minute} ${event.time_am_pm}` }</p>
          <p>{ event.status }</p>
          <NavLink exact to={ `/${user.username}/events/${event.id}` } >View Event</NavLink>
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
      case 'user-edit':
        return <ProfileInfoEditForm />
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
