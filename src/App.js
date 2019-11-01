import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import FormContainer from './containers/FormContainer'
import NotFound from './components/NotFound'
import { getUser } from './actions/userActions'
import './App.css';

const URL = 'http://localhost:3000'

class App extends Component {

  componentDidMount() {
    if (localStorage.token) {
      this.props.getUser()
    }
  }

  render() {
    console.log(this.props.state);
    return (
      <div className='App'>
        <Switch>
          <Route exact
                  path='/login'
                  render={() => <FormContainer formType='login' /> } />
          <Route exact
                  path='/create-profile'
                  render={() => <FormContainer formType='create-profile' /> } />
          <Route component={ NotFound } />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {state}
}

const mapDispatchToProps = {
  getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
