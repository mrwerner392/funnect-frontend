import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class PostCard extends Component {

  handleCreateEvent = () => {
    console.log('clicked');
  }

  renderPost = () => {
    const { props: {renderProps, createdPosts}, handleCreateEvent } = this
    const postId = renderProps.match.params.postSlug
    const post = createdPosts.find(post => post.id === parseInt(postId, 10))

    return (
        <Fragment>
          <p>{ post.topic.name }</p>
          <p>{ post.neighborhood.name }</p>
          <p>{ post.user.username }</p>
          <p>{ post.status }</p>
          <button onClick={ handleCreateEvent }>Create Event</button>
        </Fragment>
    )
  }

  render() {
    const { props: {createdPosts}, renderPost } = this

    return (
      <div>
        { createdPosts.length ? renderPost() : null }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    createdPosts: state.createdPosts.posts
  }
}

export default connect(mapStateToProps)(PostCard)
