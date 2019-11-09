import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearUser } from '../actions/userActions'
import { clearAvailablePosts, showPostsWaiting } from '../actions/availablePostsActions'
import { clearPostsInterestedIn } from '../actions/postsImInterestedInActions'
import { clearCreatedPosts, clearNewInterestedUsersExist } from '../actions/myCreatedPostsActions'
import { clearEventsHosting } from '../actions/eventsImHostingActions'
import { clearEventsAttending } from '../actions/eventsImAttendingActions'
import { clearTopics } from '../actions/topicsActions'
import { clearNeighborhoods } from '../actions/neighborhoodsActions'
import { setContentType } from '../actions/contentTypeActions'

class NavBar extends Component {

  handleMatChatClick = () => {
    const { props: {
              user: {username},
              setContentType,
              history
            },
            handlePostsWaiting } = this

    if (username) {
      handlePostsWaiting()
      setContentType('posts')
      history.push('/posts')
    } else {
      history.push('/login')
    }
  }

  handleNavBarButtonClick = type => {
    const { props: {
              user: {username},
              setContentType,
              history
            },
            handlePostsWaiting,
            handleNewInfo } = this

    if (type !== 'create') {
      setContentType(type)
    }
    switch (type) {
      case 'user':
        handleNewInfo()
        history.push(`/${username}`)
        break
      case 'posts':
        handlePostsWaiting()
        history.push('/posts')
        break
      case 'create':
        history.push('/create-post')
        break
      default:
        break
    }

  }

  handlePostsWaiting = () => {
    const { postsWaiting, showPostsWaiting } = this.props
    if (postsWaiting.length) {
      showPostsWaiting()
    }
  }

  handleNewInfo = () => {
    const { newInterestedUsersExist, clearNewInterestedUsersExist } = this.props
    if (newInterestedUsersExist) {
      clearNewInterestedUsersExist()
    }
  }

  handleLogout = () => {
    const { clearUser,
            clearAvailablePosts,
            clearPostsInterestedIn,
            clearCreatedPosts,
            clearEventsHosting,
            clearEventsAttending,
            clearTopics,
            clearNeighborhoods,
            history } = this.props

    localStorage.clear();
    clearUser();
    clearAvailablePosts();
    clearPostsInterestedIn();
    clearCreatedPosts();
    clearEventsHosting();
    clearEventsAttending();
    clearTopics();
    clearNeighborhoods();
    history.push('/login');
  }

  renderPostsWaitingCount = () => {
    const { postsWaiting } = this.props
    return postsWaiting.length ? `(${postsWaiting.length})` : null
  }

  renderNewInfoMessage = () => {
    const { newInterestedUsersExist } = this.props
    return newInterestedUsersExist ? '(New Info)' : null
  }

  render() {
    const { props: {user: {username}},
              handleLogout,
              handleMatChatClick,
              handleNavBarButtonClick,
              renderPostsWaitingCount,
              renderNewInfoMessage } = this

    return (
      <div>
        <button onClick={ handleMatChatClick } >MatChat</button>
        { username
          ?
          <Fragment>
            <button onClick={ () => handleNavBarButtonClick('user') } >{ username } { renderNewInfoMessage() }</button>
            <button onClick={ () => handleNavBarButtonClick('posts') } >Home { renderPostsWaitingCount() }</button>
            <button onClick={ () => handleNavBarButtonClick('create') } >New Post</button>
            <button to='/login' onClick={ handleLogout } >Log Out</button>
          </Fragment>
          :
          null
        }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user,
    postsWaiting: state.availablePosts.postsWaiting,
    newInterestedUsersExist: state.createdPosts.newInterestedUsersExist
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearUser: () => dispatch(clearUser()),
    clearAvailablePosts: () => dispatch(clearAvailablePosts()),
    clearPostsInterestedIn: () => dispatch(clearPostsInterestedIn()),
    clearCreatedPosts: () => dispatch(clearCreatedPosts()),
    clearEventsHosting: () => dispatch(clearEventsHosting()),
    clearEventsAttending: () => dispatch(clearEventsAttending()),
    clearTopics: () => dispatch(clearTopics()),
    clearNeighborhoods: () => dispatch(clearNeighborhoods()),
    setContentType: type => dispatch(setContentType(type)),
    showPostsWaiting: () => dispatch(showPostsWaiting()),
    clearNewInterestedUsersExist: () => dispatch(clearNewInterestedUsersExist())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
