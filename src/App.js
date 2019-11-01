import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import AccountFormContainer from './containers/AccountFormContainer'
import ContentContainer from './containers/ContentContainer'
import NotFound from './components/NotFound'
import { getUser } from './actions/userActions'
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
    if (localStorage.token) {
      this.props.getUser()
    }
  }

  render() {
    console.log(this.props.user);
    return (
      <div className='App'>
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
                  render={ () => <ContentContainer content='posts'/> }
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
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
