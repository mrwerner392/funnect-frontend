import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearUser, toggleHasNewInfo } from '../actions/userActions';
import { clearAvailablePosts, showPostsWaiting } from '../actions/availablePostsActions';
import { clearPostsInterestedIn } from '../actions/postsImInterestedInActions';
import { clearCreatedPosts } from '../actions/myCreatedPostsActions';
import { clearEventsHosting } from '../actions/eventsImHostingActions';
import { clearEventsAttending } from '../actions/eventsImAttendingActions';
import { clearTopics } from '../actions/topicsActions';
import { clearNeighborhoods } from '../actions/neighborhoodsActions';
import { clearCurrentEvent } from '../actions/currentEventActions';
import { clearCurrentPost } from '../actions/currentPostActions';
import { setContentType, clearContentType } from '../actions/contentTypeActions';

const NavBar = props => {

  const { user,
          setContentType,
          postsWaiting,
          showPostsWaiting,
          toggleHasNewInfo,
          clearUser,
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
          history } = props

  // if logged in route to available posts page
  const handleFunnectClick = () => {
    if (user.username) {
      handlePostsWaiting()
      setContentType('posts')
      history.push('/posts')
    } else {
      history.push('/login')
    }
  }

  // handle username, 'Posts', and 'New Post' click
  const handleNavBarButtonClick = type => {
    if (type !== 'create') {
      setContentType(type)
    }

    switch (type) {
      case 'user':
        handleNewInfo()
        history.push(`/${user.username}`)
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

  // if they click 'new posts' noti
  const handlePostsWaiting = () => {
    if (postsWaiting.length) {
      showPostsWaiting()
    }
  }

  // turn off new info noti on username button
  const handleNewInfo = () => {
    if (user.hasNewInfo) {
      toggleHasNewInfo()
    }
  }

  const handleLogout = () => {
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

  // show # new posts in Posts navbar button
  const renderPostsWaitingCount = () => {
    return postsWaiting.length
              ? <span id='new-posts'>{ `(${postsWaiting.length})` }</span>
              : null
  }

  // show '+' in username navbar button if there are notis
  const renderNewInfoMessage = () => {
    return user.hasNewInfo
              ? <span id='new-info'>(+)</span>
              : null
  }

  const path = history.location.pathname.split('/')[1]
  return (
    <div className='nav-bar'>
      <button className='nav-button mat-chat'
              onClick={ handleFunnectClick }
              >
        Funnect
      </button>
      { user.username
        ?
        <Fragment>
          <button className={ path === user.username
                                    ? 'nav-button nav-active'
                                    : 'nav-button'}
                  onClick={ () => handleNavBarButtonClick('user') }
                  >
            { user.username } { renderNewInfoMessage() }
          </button>
          <button className={ path === 'posts'
                                    ? 'nav-button nav-active'
                                    : 'nav-button'}
                  onClick={ () => handleNavBarButtonClick('posts') }
                  >
            Posts { renderPostsWaitingCount() }
          </button>
          <button className={ path === 'create-post'
                                    ? 'nav-button nav-active'
                                    : 'nav-button'}
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

const mapStateToProps = state => {
  return {
    user: state.user,
    postsWaiting: state.availablePosts.postsWaiting,
    newInterestedUsersExist: state.createdPosts.newInterestedUsersExist
  }
}

const mapDispatchToProps = {
  clearUser,
  clearAvailablePosts,
  clearPostsInterestedIn,
  clearCreatedPosts,
  clearEventsHosting,
  clearEventsAttending,
  clearTopics,
  clearNeighborhoods,
  setContentType,
  showPostsWaiting,
  toggleHasNewInfo,
  clearCurrentEvent,
  clearCurrentPost,
  clearContentType
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
