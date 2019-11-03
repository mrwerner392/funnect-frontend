import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class PostCard extends Component {

  renderPost = () => {
    const { renderProps, createdPosts } = this.props
    const postId = renderProps.match.params.postSlug
    const post = createdPosts.find(post => post.id === parseInt(postId, 10)) || null

    return (
      post
        ?
        <Fragment>
          <p>{ post.topic.name }</p>
          <p>{ post.neighborhood.name }</p>
          <p>{ post.user.username }</p>
          <p>{ post.status }</p>
        </Fragment>
        :
        null
    )
  }

  render() {
    const { renderPost } = this

    return (
      <div>
        { renderPost() }
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
