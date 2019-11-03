import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import AccountFormContainer from './containers/AccountFormContainer';
import PostFormContainer from './containers/PostFormContainer';
import ContentContainer from './containers/ContentContainer';
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
import './App.css';

class App extends Component {

  renderContent = (renderProps, contentType) => {
    const slug = renderProps.match.params.slug
    if (slug === this.props.user.username) {
      return <ContentContainer contentType={ contentType }/>
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
      getInterests } = this.props

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
    }
  }

  render() {
    return (
      <div className='App'>
        <NavLink to='/login'> login |</NavLink>
        <NavLink to='/create-profile'>| create-profile |</NavLink>
        <NavLink to='/posts'>| posts |</NavLink>
        <NavLink to='/matt18'>| matt18 |</NavLink>
        <NavLink to='/matt18/posts'>| matt18/posts |</NavLink>
        <NavLink to='/matt18/events'>| matt18/events |</NavLink>
        <NavLink to='/create-post'>| create-post </NavLink>
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
                  render={ () => <ContentContainer contentType='posts' /> }
                  />
          <Route exact
                  path='/create-post'
                  render={ () => <PostFormContainer /> }
                  />
          <Route exact
                  path='/:slug'
                  render={ renderProps => this.renderContent(renderProps, 'user') }
                  />
          <Route exact
                  path='/:slug/posts'
                  render={ renderProps => this.renderContent(renderProps, 'user-posts') }
                  />
          <Route exact
                  path='/:slug/events'
                  render={ renderProps => this.renderContent(renderProps, 'user-events') }
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
    topics: state.topics
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
  getInterests
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
