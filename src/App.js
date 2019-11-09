import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import NavBar from './components/NavBar'
import AccountFormContainer from './containers/AccountFormContainer';
import PostFormContainer from './containers/PostFormContainer';
import ContentContainer from './containers/ContentContainer';
import PostCard from './components/PostCard';
import EventCard from './components/EventCard';
import NotFound from './components/NotFound';
import { getUser } from './actions/userActions';
import { getAvailablePosts, addPostWaiting } from './actions/availablePostsActions';
import { getCreatedPosts, addCreatedPost } from './actions/myCreatedPostsActions';
import { getPostsInterestedIn } from './actions/postsImInterestedInActions';
import { getEventsHosting } from './actions/eventsImHostingActions';
import { getEventsAttending } from './actions/eventsImAttendingActions';
import { getTopics } from './actions/topicsActions';
import { getNeighborhoods } from './actions/neighborhoodsActions';
import { getInterests } from './actions/interestsActions';
import { getCurrentEvent } from './actions/currentEventActions';
import { getCurrentPost } from './actions/currentPostActions';
import { setContentType } from './actions/contentTypeActions';
import { ActionCableConsumer } from 'react-actioncable-provider';
import './App.css';

class App extends Component {

  renderContent = renderProps => {
    const slug = renderProps.match.params.slug
    if (slug === this.props.user.username) {
      return <ContentContainer />
    } else {
      return <NotFound />
    }
  }

  handleNewPost = post => {
    const { user, addPostWaiting, addCreatedPost } = this.props
    console.log(post.user.id, user.id);
    if (user.id && post.user.id !== user.id) {
      addPostWaiting(post)
    } else if (user.id && post.user.id === user.id) {
      addCreatedPost(post)
    }
  }

  componentDidMount() {
    const { getUser,
            getAvailablePosts,
            getCreatedPosts,
            getPostsInterestedIn,
            getEventsHosting,
            getEventsAttending,
            getTopics,
            getNeighborhoods,
            getInterests,
            getCurrentEvent,
            getCurrentPost,
            setContentType,
            history } = this.props

    getInterests()

    if (localStorage.token) {
      getUser()
      getAvailablePosts()
      getCreatedPosts()
      getPostsInterestedIn()
      getEventsHosting()
      getEventsAttending()
      getTopics()
      getNeighborhoods()

      const urlPaths = history.location.pathname.split('/')
      if (urlPaths[1] === 'posts') {
        setContentType('posts')
      } else if (urlPaths[2] === 'posts' && urlPaths.length === 3) {
        setContentType('user-posts')
      } else if (urlPaths[2] === 'events' && urlPaths.length === 3) {
        setContentType('user-events')
      } else if (urlPaths[2] === 'posts' && urlPaths.length === 4) {
        getCurrentPost(urlPaths[3])
      } else if (urlPaths[2] === 'events' && urlPaths.length === 4) {
        getCurrentEvent(urlPaths[3])
      } else if (urlPaths.length === 2) {
        setContentType('user')
      }

    } else {
      history.push('/login')
    }

  }

  render() {
    const { renderContent, handleNewPost } = this
    return (
      <div className='App'>
        <ActionCableConsumer channel={ {channel: 'PostsChannel'} }
          onReceived={ handleNewPost } />
        <NavBar />
        <Switch>
          <Route exact
                  path='/login'
                  render={ () => <AccountFormContainer formType='login' /> }
                  />
          <Route exact
                  path='/create-profile'
                  render={ () => <AccountFormContainer formType='create-profile' /> }
                  />
          <Route exact
                  path='/posts'
                  render={ () => <ContentContainer /> }
                  />
          <Route exact
                  path='/create-post'
                  render={ () => <PostFormContainer /> }
                  />
          <Route exact
                  path='/:slug'
                  render={ renderContent }
                  />
          <Route exact
                  path='/:slug/edit'
                  render={ renderContent }
                  />
          <Route exact
                  path='/:slug/posts'
                  render={ renderContent }
                  />
          <Route exact
                  path='/:slug/events'
                  render={ renderContent }
                  />
          <Route exact
                  path='/:slug/posts/:postSlug'
                  render={ renderProps => <PostCard renderProps={ renderProps } /> }
                  />
          <Route exact
                  path='/:slug/events/:eventSlug'
                  render={ renderProps => <EventCard renderProps={ renderProps } /> }
                  />
          <Route component={ NotFound } />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // console.log('app', state);
  return {
    user: state.user,
    availablePosts: state.availablePosts,
    createdPosts: state.createdPosts,
    postsInterestedIn: state.postsInterestedIn,
    eventsHosting: state.eventsHosting,
    eventsAttending: state.eventsAttending,
    topics: state.topics,
    neighborhoods: state.neighborhoods
  }
}

const mapDispatchToProps = {
  getUser,
  getAvailablePosts,
  getCreatedPosts,
  getPostsInterestedIn,
  getEventsHosting,
  getEventsAttending,
  getTopics,
  getNeighborhoods,
  getInterests,
  getCurrentEvent,
  getCurrentPost,
  setContentType,
  addPostWaiting,
  addCreatedPost
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
