import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearUser, toggleHasNewInfo } from '../actions/userActions';
import { clearAvailablePosts, showPostsWaiting } from '../actions/availablePostsActions';
import { clearPostsInterestedIn } from '../actions/postsImInterestedInActions';
import { clearCreatedPosts, clearNewInterestedUsersExist } from '../actions/myCreatedPostsActions';
import { clearEventsHosting } from '../actions/eventsImHostingActions';
import { clearEventsAttending } from '../actions/eventsImAttendingActions';
import { clearTopics } from '../actions/topicsActions';
import { clearNeighborhoods } from '../actions/neighborhoodsActions';
import { clearCurrentEvent } from '../actions/currentEventActions';
import { clearCurrentPost } from '../actions/currentPostActions';
import { setContentType, clearContentType } from '../actions/contentTypeActions';

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
    const { user: {hasNewInfo}, toggleHasNewInfo } = this.props
    if (hasNewInfo) {
      toggleHasNewInfo()
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
            clearCurrentEvent,
            clearCurrentPost,
            clearContentType,
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
    clearCurrentEvent();
    clearCurrentPost();
    clearContentType();
    history.push('/login');
  }

  renderPostsWaitingCount = () => {
    const { postsWaiting } = this.props
    return postsWaiting.length ? `(${postsWaiting.length})` : null
  }

  renderNewInfoMessage = () => {
    const { hasNewInfo } = this.props.user
    return hasNewInfo ? '(New Info)' : null
  }

  render() {
    const { props: {user: {username}, history},
              handleLogout,
              handleMatChatClick,
              handleNavBarButtonClick,
              renderPostsWaitingCount,
              renderNewInfoMessage } = this
    const path = history.location.pathname.split('/')[1]

    return (
      <div className='nav-bar'>
        <button className='nav-button mat-chat'
                onClick={ handleMatChatClick }
                >
          MatChat
        </button>
        { username
          ?
          <Fragment>
            <button className={ path === username ? 'nav-button active' : 'nav-button'}
                    onClick={ () => handleNavBarButtonClick('user') }
                    >
              { username } { renderNewInfoMessage() }
            </button>
            <button className={ path === 'posts' ? 'nav-button active' : 'nav-button'}
                    onClick={ () => handleNavBarButtonClick('posts') }
                    >
              Home { renderPostsWaitingCount() }
            </button>
            <button className={ path === 'create-post' ? 'nav-button active' : 'nav-button'}
                    onClick={ () => handleNavBarButtonClick('create') }
                    >
              New Post
            </button>
            <button className='nav-button'
                    onClick={ handleLogout }
                    >
              Log Out
            </button>
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
    toggleHasNewInfo: () => dispatch(toggleHasNewInfo()),
    clearCurrentEvent: () => dispatch(clearCurrentEvent()),
    clearCurrentPost: () => dispatch(clearCurrentPost()),
    clearContentType: () => dispatch(clearContentType())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
