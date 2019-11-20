import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleHasNewInfo } from '../actions/userActions';
import { addNewInterestedUser, clearNewInterestedUsers, toggleNewInterestedUsersExist } from '../actions/myCreatedPostsActions';
import { addNewInterestedUserCurrentPost } from '../actions/currentPostActions';
import { ActionCableConsumer } from 'react-actioncable-provider';

const PostInterestChannelCable = props => {

  const { user,
          createdPosts,
          toggleHasNewInfo,
          addNewInterestedUser,
          addNewInterestedUserCurrentPost,
          clearNewInterestedUsers,
          toggleNewInterestedUsersExist,
          history } = props

  const handleNewPostInterest = ({ post, interested_user }) => {

    addNewInterestedUser(post, interested_user)

    // logic for if and when to show notifications

    const location = history.location.pathname
    if (location === `/${user.username}/posts/${post.id}`) {
      // if user is viewing the post that has new interest, add it there
        // post being viewed held separately in state
      clearNewInterestedUsers(post.id)
      addNewInterestedUserCurrentPost(post)
    } else {
      if (!(createdPosts.newInterestedUsersExist
                      || location === `/${user.username}/posts`)) {
        // toggle to true -- will result in 'new interested users' notification
        // in user filter bar
        toggleNewInterestedUsersExist()
      }
    }

    if (!user.hasNewInfo) {
      switch (location) {
        case `/${user.username}`:
        case `/${user.username}/posts`:
        case `/${user.username}/posts/${post.id}`:
          break
        default:
          // toggle user has new info to true if false -- will result in
          // 'new info' notification in nav bar
          toggleHasNewInfo()
          break
      }
    }

  }

  return (
    <Fragment>
      {
        createdPosts.posts.map(post => (
          <ActionCableConsumer
              key={ post.id }
              channel={ {channel: 'PostInterestsChannel', post_id: post.id} }
              onReceived={ handleNewPostInterest } />
          )
        )
      }
    </Fragment>
  )

}

const mapStateToProps = state => {
  return {
    user: state.user,
    createdPosts: state.createdPosts
  }
}

const mapDispatchToProps = {
  toggleHasNewInfo,
  addNewInterestedUser,
  clearNewInterestedUsers,
  toggleNewInterestedUsersExist,
  addNewInterestedUserCurrentPost,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostInterestChannelCable))
