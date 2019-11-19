import React from 'react';
import { connect } from 'react-redux';
import { addPostWaiting } from '../actions/availablePostsActions';
import { addCreatedPost } from '../actions/myCreatedPostsActions';
import { ActionCableConsumer } from 'react-actioncable-provider';

const PostChannelCable = props => {

  const { user, addPostWaiting, addCreatedPost } = props

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
