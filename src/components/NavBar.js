import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { clearUser } from '../actions/userActions'
import { clearAvailablePosts, clearPostsWaiting } from '../actions/availablePostsActions'
import { clearPostsInterestedIn } from '../actions/postsImInterestedInActions'
import { clearCreatedPosts } from '../actions/myCreatedPostsActions'
import { clearEventsHosting } from '../actions/eventsImHostingActions'
import { clearEventsAttending } from '../actions/eventsImAttendingActions'
import { clearTopics } from '../actions/topicsActions'
import { clearNeighborhoods } from '../actions/neighborhoodsActions'
import { setContentType } from '../actions/contentTypeActions'

class NavBar extends Component {

  handleMatChatClick = () => {
    const { user: {username}, setContentType, history } = this.props
    if (username) {
      setContentType('posts')
      history.push('/posts')
    } else {
      history.push('/login')
    }
  }

  handleNavBarButtonClick = type => {
    const { user: {username}, setContentType, history } = this.props
    if (type !== 'create') {
      setContentType(type)
    }
    switch (type) {
      case 'user':
        console.log('here', username);
        history.push(`/${username}`)
        break
      case 'posts':
        history.push('/posts')
        break
      case 'create':
        history.push('/create-post')
        break
      default:
        break
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
    const { postsWaiting, clearPostsWaiting, history } = this.props
    console.log(history);
    if (history.location.pathname.split('/')[1] != 'posts' && postsWaiting) {
      return `(${postsWaiting})`
    } else {
      clearPostsWaiting()
      return null
    }
  }

  render() {
    const { props: {user: {username}},
              handleLogout,
              handleMatChatClick,
              handleNavBarButtonClick,
              renderPostsWaitingCount } = this

    return (
      <div>
        <button onClick={ handleMatChatClick } >MatChat</button>
        { username
          ?
          <Fragment>
            <button onClick={ () => handleNavBarButtonClick('user') } >{ username }</button>
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
    postsWaiting: state.availablePosts.postsWaiting
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
    clearPostsWaiting: () => dispatch(clearPostsWaiting())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
