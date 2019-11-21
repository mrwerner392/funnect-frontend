import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import PostChannelCable from './components/PostChannelCable';
import EventChannelCable from './components/EventChannelCable';
import PostInterestChannelCable from './components/PostInterestChannelCable';
import EventChatChannelCable from './components/EventChatChannelCable';
import AccountFormContainer from './containers/AccountFormContainer';
import ContentContainer from './containers/ContentContainer';
import ProfileInfoEditForm from './components/ProfileInfoEditForm';
import PostCard from './components/PostCard';
import PostForm from './components/PostForm';
import EventCard from './components/EventCard';
import EventNotification from './components/EventNotification';
import NotFound from './components/NotFound';
import { getUser } from './actions/userActions';
import { getAvailablePosts } from './actions/availablePostsActions';
import { getCreatedPosts } from './actions/myCreatedPostsActions';
import { getPostsInterestedIn } from './actions/postsImInterestedInActions';
import { getEventsHosting } from './actions/eventsImHostingActions';
import { getEventsAttending } from './actions/eventsImAttendingActions';
import { getTopics } from './actions/topicsActions';
import { getNeighborhoods } from './actions/neighborhoodsActions';
import { getInterests } from './actions/interestsActions';
import { getCurrentEvent } from './actions/currentEventActions';
import { getCurrentPost } from './actions/currentPostActions';
import { setContentType } from './actions/contentTypeActions';
import './App.css';

class App extends Component {

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
            renderContent } = this

    return (
      <div className='App'>
        <PostChannelCable />
        <EventChannelCable />
        <PostInterestChannelCable />
        <EventChatChannelCable />
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
  setContentType
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
