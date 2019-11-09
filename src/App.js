import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import NavBar from './components/NavBar'
import AccountFormContainer from './containers/AccountFormContainer';
import PostFormContainer from './containers/PostFormContainer';
import ContentContainer from './containers/ContentContainer';
import PostCard from './components/PostCard';
import EventCard from './components/EventCard';
import NotFound from './components/NotFound';
import { getUser, toggleHasNewInfo } from './actions/userActions';
import { getAvailablePosts, addPostWaiting } from './actions/availablePostsActions';
import { getCreatedPosts, addCreatedPost, addNewInterestedUser } from './actions/myCreatedPostsActions';
import { getPostsInterestedIn } from './actions/postsImInterestedInActions';
import { getEventsHosting, addEventHostingMessage } from './actions/eventsImHostingActions';
import { getEventsAttending, addEventAttendingMessage } from './actions/eventsImAttendingActions';
import { getTopics } from './actions/topicsActions';
import { getNeighborhoods } from './actions/neighborhoodsActions';
import { getInterests } from './actions/interestsActions';
import { getCurrentEvent, addCurrentEventMessage } from './actions/currentEventActions';
import { getCurrentPost } from './actions/currentPostActions';
import { setContentType } from './actions/contentTypeActions';
import { ActionCableConsumer } from 'react-actioncable-provider';
import './App.css';

class App extends Component {

  handleNewPost = post => {
    const { user, addPostWaiting, addCreatedPost } = this.props
    if (user.id && post.user.id !== user.id) {
      addPostWaiting(post)
    } else if (user.id && post.user.id === user.id) {
      addCreatedPost(post)
    }
  }

  handleNewPostInterest = post => {
    const { user, toggleHasNewInfo, addNewInterestedUser } = this.props
    if (!user.hasNewInfo) {
      toggleHasNewInfo()
    }
    addNewInterestedUser(post)
  }

  handleNewMessage = (message, event) => {
    const { user,
            currentEvent,
            addEventHostingMessage,
            addEventAttendingMessage,
            addCurrentEventMessage } = this.props

    if (event.user.id === user.id) {
      addEventHostingMessage(message, event.id)
    } else {
      addEventAttendingMessage(message, event.id)
    }

    addCurrentEventMessage(message)

  }

  renderActionCables = () => {
    const { props: {createdPosts, eventsHosting, eventsAttending},
            handleNewPost,
            handleNewPostInterest,
            handleNewMessage } = this
    const allEvents = [...eventsHosting.events, ...eventsAttending.events]

    return (
      <Fragment>
        <ActionCableConsumer
              channel={ {channel: 'PostsChannel'} }
              onReceived={ handleNewPost } />
        {
          createdPosts.posts.map(post => (
            <ActionCableConsumer
                key={ post.id }
                channel={ {channel: 'PostInterestsChannel', post_id: post.id} }
                onReceived={ handleNewPostInterest } />
          ))
        }
        {
          allEvents.map(event => (
            <ActionCableConsumer
                key={ event.id }
                channel={ {channel: 'EventChatsChannel', event_id: event.id} }
                onReceived={ message => handleNewMessage(message, event) } />
          ))
        }
      </Fragment>
    )
  }

  renderContent = renderProps => {
    const slug = renderProps.match.params.slug
    if (slug === this.props.user.username) {
      return <ContentContainer />
    } else {
      return <NotFound />
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
    const { renderActionCables, renderContent, handleNewPost } = this
    return (
      <div className='App'>
        { renderActionCables() }
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
  console.log(state);
  return {
    user: state.user,
    // availablePosts: state.availablePosts,
    createdPosts: state.createdPosts,
    // postsInterestedIn: state.postsInterestedIn,
    eventsHosting: state.eventsHosting,
    eventsAttending: state.eventsAttending,
    // topics: state.topics,
    // neighborhoods: state.neighborhoods
    currentEvent: state.currentEvent
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
  addCreatedPost,
  addNewInterestedUser,
  toggleHasNewInfo,
  addEventHostingMessage,
  addEventAttendingMessage,
  addCurrentEventMessage
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
