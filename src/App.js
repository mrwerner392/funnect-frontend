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
import { getAvailablePosts } from './actions/availablePostsActions';
import { getCreatedPosts } from './actions/myCreatedPostsActions';
import { getPostsInterestedIn } from './actions/postsImInterestedInActions';
import { getEventsHosting } from './actions/eventsImHostingActions';
import { getEventsAttending } from './actions/eventsImAttendingActions';
import { getTopics } from './actions/topicsActions';
import { getNeighborhoods } from './actions/neighborhoodsActions';
import { getInterests } from './actions/interestsActions';
import { getCurrentEvent} from './actions/currentEventActions';
// import { getCurrentPost} from './actions/currentPostActions';
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
      console.log(urlPaths);
      if (urlPaths.length === 4 && urlPaths[2] === 'posts') {
        // getCurrentPost(urlPaths[3])
      } else if (urlPaths.length === 4 && urlPaths[2] === 'events') {
        console.log('here');
        getCurrentEvent(urlPaths[3])
      }
    }
  }

  render() {
    const { renderContent } = this
    return (
      <div className='App'>
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
  console.log('app', state);
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
  getCurrentEvent
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
