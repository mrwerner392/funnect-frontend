import React, { Component } from 'react';

class Post extends Component {

  render() {
    const { post } = this.props
    return (
      <div className='Post'>
        <p>{ post.topic.name }</p>
        <p>{ post.neighborhood.name }</p>
        <p>{ post.user.username }</p>
      </div>
    )
  }

}

export default Post
