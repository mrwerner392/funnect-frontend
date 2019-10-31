import React, { Component } from 'react';

class AccountForm extends Component {

  state = {
    username: '',
    password: ''
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit = evt => {
    evt.preventDefault();
    console.log(this.props);
    this.props.userLoginRequest(this.state)
  }

  render() {
    return (
      <form onChange={ this.handleChange } onSubmit={ this.handleSubmit }>
        <input type='text'
                name='username'
                value={ this.state.value }
                placeholder='username'
                />
        <input type='password'
                name='password'
                value={ this.state.value }
                placeholder='password'
                />
        <input type='submit' />
      </form>
    )
  }

}

export default AccountForm;
