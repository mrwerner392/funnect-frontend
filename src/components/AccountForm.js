import React, { Component, Fragment } from 'react';

class AccountForm extends Component {

  state = {
    username: '',
    password: '',
    age: null,
    bio: '',
    college: '',
    occupation: '',
    interests: []
  }

  handleChange = evt => {
    if (evt.target.name === 'interests') {
      this.setState(prevState => {
        return {
          ...prevState,
          interests: [...prevState.interests, evt.target.value]
        }
      })
    } else {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    };
  }

  handleSubmit = evt => {
    evt.preventDefault();
    console.log(this.props);
    this.props.userLoginRequest(this.state)
  }

  renderCreateProfileFormInputs = () => {
    const { age, bio, college, occupation, interests } = this.state
    return (
      <Fragment>
        <input type='number'
                name='age'
                value={ age }
                placeholder='username'
                />
        <input type='text'
                name='bio'
                value={ bio }
                placeholder='username'
                />
        <input type='text'
                name='college'
                value={ college }
                placeholder='username'
                />
        <input type='text'
                name='occupation'
                value={ occupation }
                placeholder='username'
                />
        <label htmlFor='user-interest-select'>Choose up to 5 Interests</label>
        <select id='user-interest-select' name='interests'>
          { renderInterestOptions() }
        </select>
        <p>{ interests.join(', ') }</p>
      </Fragment>
    )

  }

  render() {
    const { state: {username, password},
            handleChange,
            handleSubmit } = this
    return (
      <form onChange={ this.handleChange } onSubmit={ this.handleSubmit }>
        <input type='text'
                name='username'
                value={ username }
                placeholder='username'
                />
        <input type='password'
                name='password'
                value={ password }
                placeholder='password'
                />
        <input type='submit' />
      </form>
    )
  }

}

export default AccountForm;
