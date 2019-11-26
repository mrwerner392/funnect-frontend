import React from 'react';
import { connect } from 'react-redux';
import { addPostWaiting } from '../actions/availablePostsActions';
import { addCreatedPost } from '../actions/myCreatedPostsActions';
import { ActionCableConsumer } from 'react-actioncable-provider';

// listen for new posts broadcast via Action Cable
const PostChannelCable = ({ user, addPostWaiting, addCreatedPost }) => {

  // handle a newly broadcast post
  const handleNewPost = post => {
    if (user.id && post.user.id !== user.id) {
      addPostWaiting(post)
    } else if (user.id && post.user.id === user.id) {
      addCreatedPost(post)
    }
  }

  return (
    <ActionCableConsumer
        channel={ {channel: 'PostsChannel'} }
        onReceived={ handleNewPost } />
  )

}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  addPostWaiting,
  addCreatedPost
}

export default connect(mapStateToProps, mapDispatchToProps)(PostChannelCable)
