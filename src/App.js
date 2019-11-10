import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import NavBar from './components/NavBar'
import AccountFormContainer from './containers/AccountFormContainer';
import PostFormContainer from './containers/PostFormContainer';
import ContentContainer from './containers/ContentContainer';
import PostCard from './components/PostCard';
import EventCard from './components/EventCard';
import EventNotification from './components/EventNotification';
import NotFound from './components/NotFound';
import { getUser, toggleHasNewInfo } from './actions/userActions';
import { getAvailablePosts, addPostWaiting } from './actions/availablePostsActions';
import { getCreatedPosts, addCreatedPost, addNewInterestedUser, clearNewInterestedUsers, toggleNewInterestedUsersExist } from './actions/myCreatedPostsActions';
import { getPostsInterestedIn } from './actions/postsImInterestedInActions';
import { getEventsHosting, addEventHostingMessage, toggleEventsHostingNewMessagesExist } from './actions/eventsImHostingActions';
import { getEventsAttending, addEventAttendingMessage,
toggleEventsAttendingNewMessagesExist, newEventAttending } from './actions/eventsImAttendingActions';
import { getTopics } from './actions/topicsActions';
import { getNeighborhoods } from './actions/neighborhoodsActions';
import { getInterests } from './actions/interestsActions';
import { getCurrentEvent, addCurrentEventMessage } from './actions/currentEventActions';
import { getCurrentPost, addNewInterestedUserCurrentPost } from './actions/currentPostActions';
import { setContentType } from './actions/contentTypeActions';
import { ActionCableConsumer } from 'react-actioncable-provider';
import './App.css';

class App extends Component {

  // action cable response handler -- new posts
  handleNewPost = post => {
    const { user, addPostWaiting, addCreatedPost } = this.props
    if (user.id && post.user.id !== user.id) {
      addPostWaiting(post)
    } else if (user.id && post.user.id === user.id) {
      addCreatedPost(post)
    }
  }

  // action cable response handler -- new user interested in my post
  handleNewPostInterest = ({ post, interested_user }) => {
    const { user,
            currentPost,
            createdPosts,
            toggleHasNewInfo,
            addNewInterestedUser,
            addNewInterestedUserCurrentPost,
            clearNewInterestedUsers,
            toggleNewInterestedUsersExist,
            history } = this.props

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

  // action cable response handler -- new message in one of my events
  handleNewMessage = (message, event) => {
    const { user,
            currentEvent,
            eventsHosting,
            eventsAttending,
            addEventHostingMessage,
            addEventAttendingMessage,
            addCurrentEventMessage,
            toggleEventsHostingNewMessagesExist,
            toggleEventsAttendingNewMessagesExist,
            toggleHasNewInfo,
            history } = this.props

    if (event.user.id === user.id) {
      addEventHostingMessage(message, event.id)
    } else {
      addEventAttendingMessage(message, event.id)
    }


    // logic for if and when to show notifications

    const location = history.location.pathname
    if (location === `/${user.username}/events/${event.id}`) {
      // if user is viewing the event that has new message, add message there
        // current message being viewed held separately in state
      addCurrentEventMessage(message)
    } else {

      // if not already viewing the event, determine if we need to show
      // a new messages notification or if one already exists
      if (location !== `/${user.username}/events`) {
        const newMessagesAlreadyExist = (
          eventsHosting.newMessagesExist || eventsAttending.newMessagesExist
        )

        if (!newMessagesAlreadyExist) {
          event.user.id === user.id
                ? toggleEventsHostingNewMessagesExist()
                : toggleEventsAttendingNewMessagesExist()
        }

      }
    }

    if (!user.hasNewInfo) {
      const location = history.location.pathname
      switch (location) {
        case `/${user.username}`:
        case `/${user.username}/events`:
        case `/${user.username}/events/${event.id}`:
          break
        default:
          // toggle user has new info to true if false -- will result in
          // 'new info' notification in nav bar
          toggleHasNewInfo()
          break
      }
    }

  }

  handleNewEvent = event => {
    const { user, newEventExists } = this.props
    const attendingIds = event.users_attending.map(user => user.id)
    if (attendingIds.includes(user.id)) {
      newEventAttending(event)
    }
  }

  renderActionCables = () => {
    const { props: {createdPosts, eventsHosting, eventsAttending},
            handleNewPost,
            handleNewPostInterest,
            handleNewMessage,
            handleNewEvent } = this
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
        <ActionCableConsumer
            channel={ {channel: 'EventsChannel'} }
            onReceived={ handleNewEvent }/>
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
    const { props: {eventsAttending: {newEventExists} },
            renderActionCables,
            renderContent,
            handleNewPost } = this

    return (
      <div className='App'>
        { renderActionCables() }
        <NavBar />
        { newEventExists ? <EventNotification /> : null }
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
    currentEvent: state.currentEvent,
    currentPost: state.currentPost
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
  addNewInterestedUserCurrentPost,
  toggleNewInterestedUsersExist,
  toggleHasNewInfo,
  addEventHostingMessage,
  addEventAttendingMessage,
  addCurrentEventMessage,
  toggleEventsHostingNewMessagesExist,
  toggleEventsAttendingNewMessagesExist,
  newEventAttending
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
