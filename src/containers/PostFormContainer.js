import React, { Component } from 'react';
import PostForm from '../components/PostForm';

class PostFormContainer extends Component {

  render() {
    return (
      <div>
        Create Post
        <PostForm />
      </div>
    )
  }

}

export default PostFormContainer;
