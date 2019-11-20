import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import PostChannelCable from './components/PostChannelCable';
import EventChannelCable from './components/EventChannelCable';
import PostInterestChannelCable from './components/PostInterestChannelCable';
import AccountFormContainer from './containers/AccountFormContainer';
import ContentContainer from './containers/ContentContainer';
import ProfileInfoEditForm from './components/ProfileInfoEditForm';
import PostCard from './components/PostCard';
import PostForm from './components/PostForm';
import EventCard from './components/EventCard';
import EventNotification from './components/EventNotification';
import NotFound from './components/NotFound';
import { getUser, toggleHasNewInfo } from './actions/userActions';
import { getAvailablePosts } from './actions/availablePostsActions';
import { getCreatedPosts } from './actions/myCreatedPostsActions';
import { getPostsInterestedIn } from './actions/postsImInterestedInActions';
import { getEventsHosting, addEventHostingMessage, toggleEventsHostingNewMessagesExist } from './actions/eventsImHostingActions';
import { getEventsAttending, addEventAttendingMessage,
toggleEventsAttendingNewMessagesExist } from './actions/eventsImAttendingActions';
import { getTopics } from './actions/topicsActions';
import { getNeighborhoods } from './actions/neighborhoodsActions';
import { getInterests } from './actions/interestsActions';
import { getCurrentEvent, addCurrentEventMessage } from './actions/currentEventActions';
import { getCurrentPost } from './actions/currentPostActions';
import { setContentType } from './actions/contentTypeActions';
import { ActionCableConsumer } from 'react-actioncable-provider';
import './App.css';

class App extends Component {

  // action cable response handler -- new message in one of my events
  handleNewMessage = (message, event) => {
    const { user,
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

  renderActionCables = () => {
    const { props: {createdPosts, eventsHosting, eventsAttending},
            handleNewPostInterest,
            handleNewMessage,
            handleNewEvent } = this
    const allEvents = [...eventsHosting.events, ...eventsAttending.events]

    return (
      <Fragment>
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
    const { user, history } = this.props
    const slug = renderProps.match.params.slug
    const location = history.location.pathname

    if (slug === user.username) {
      return location === `/${user.username}/edit`
            ? <ProfileInfoEditForm />
            : <ContentContainer />
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
            renderContent } = this

    return (
      <div className='App'>
        <PostChannelCable />
        <EventChannelCable />
        <PostInterestChannelCable />
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
                  render={ () => <PostForm /> }
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
                  render={ () => <PostCard /> }
                  />
          <Route exact
                  path='/:slug/events/:eventSlug'
                  render={ () => <EventCard /> }
                  />
          <Route component={ NotFound } />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    createdPosts: state.createdPosts,
    eventsHosting: state.eventsHosting,
    eventsAttending: state.eventsAttending,
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
  toggleHasNewInfo,
  addEventHostingMessage,
  addEventAttendingMessage,
  addCurrentEventMessage,
  toggleEventsHostingNewMessagesExist,
  toggleEventsAttendingNewMessagesExist,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
