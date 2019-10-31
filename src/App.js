import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import AccountForm from './components/AccountForm'
import NotFound from './components/NotFound'
import './App.css';

class App extends Component {

  render() {
    console.log(this.props.state);
    return (
      <div className='App'>
        <Switch>
          <Route path='/login' exact component={ AccountForm } />
          <Route component={ NotFound } />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {state}
}

export default connect(mapStateToProps)(App);
