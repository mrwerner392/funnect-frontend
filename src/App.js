import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountForm from './components/AccountForm'
import './App.css';

class App extends Component {

  render() {
    console.log(this.props.state);
    return (
      <div className="App">
        <AccountForm />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {state}
}

export default connect(mapStateToProps)(App);
