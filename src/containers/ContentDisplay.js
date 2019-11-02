import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileInfo from '../components/ProfileInfo';

class ContentDisplay extends Component {

  renderAvailablePosts = () => {
    return this.props.availablePosts.map(post => {
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
    return this.props.createdPosts.map(post => {
      return (
        <div>
          <p>{ post.topic.name }</p>
          <p>{ post.neighborhood.name }</p>
          <p>{ post.user.username }</p>
        </div>
      )
    })
  }

  renderPostsInterestedIn = () => {
    return this.props.postsInterestedIn.map(post => {
      return (
        <div>
          <p>{ post.topic.name }</p>
          <p>{ post.neighborhood.name }</p>
          <p>{ post.user.username }</p>
        </div>
      )
    })
  }

  renderContent = () => {
    const { props: {user, contentType},
            renderAvailablePosts,
            renderMyPosts } = this

    switch (contentType) {
      case 'user':
        return <ProfileInfo user={ user } />
      case 'user-posts':
        return renderMyPosts()
      case 'user-events':
        return <div>user-events</div>
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
    createdPosts: state.createdPosts.posts,
    postsInterestedIn: state.postsInterestedIn.posts,
    eventsHosting: state.eventsHosting.posts
  }
}

export default connect(mapStateToProps)(ContentDisplay)
