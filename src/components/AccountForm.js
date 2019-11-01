import React, { Component, Fragment } from 'react';

const URL = 'http://localhost:3000'

class AccountForm extends Component {

  state = {
    username: '',
    password: '',
    first_name: '',
    age: null,
    bio: '',
    college: '',
    occupation: '',
    interests: [],
    interestOptions: []
  }

  handleChange = evt => {
    if (evt.target.name === 'interests') {
      this.setState(prevState => {
        return {
          interests: [...prevState.interests, evt.target.value]
        }
      })
    } else {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    };
  }

  handleLoginSubmit = evt => {
    evt.preventDefault();
    const { username, password } = this.state
    this.props.loginRequest({ username, password })
  }

  handleCreateSubmit = evt => {
    evt.preventDefault();
    const { username, password, age, bio, college, occupation, interests } = this.state
    this.props.createUserRequest({ username, password, age, bio, college, occupation, interests })
  }

  renderCreateProfileFormInputs = () => {
    const { first_name, age, bio, college, occupation, interests, interestOptions } = this.state

    return (
      <Fragment>
        <input type='text'
                name='first_name'
                value={ first_name }
                placeholder='first name'
                />
        <input type='number'
                name='age'
                value={ age }
                placeholder='age'
                />
        <input type='text'
                name='bio'
                value={ bio }
                placeholder='bio'
                />
        <input type='text'
                name='college'
                value={ college }
                placeholder='college'
                />
        <input type='text'
                name='occupation'
                value={ occupation }
                placeholder='occupation'
                />
        <label htmlFor='user-interest-select'>Choose up to 5 Interests</label>
        <select id='user-interest-select' name='interests'>
          { <option></option> }
          { interestOptions.map(option => <option key={ option } value={ option }>{ option }</option>) }
        </select>
        <p>{ interests.join(', ') }</p>
      </Fragment>
    )

  }


  componentDidMount() {
    if (this.props.formType === 'create-profile') {
      fetch(URL + '/interests')
      .then(res => res.json())
      .then(interests => {
        this.setState({
          interestOptions: interests.map(interest => interest.name)
        })
      })
    }
  }

  render() {
    const { state: {username, password},
            props: {formType},
            handleChange,
            handleSubmit,
            renderCreateProfileFormInputs } = this
    return (
      <form onChange={ handleChange }
            onSubmit={ formType === 'login' ? handleLoginSubmit : handleCreateSubmit }>
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
        { formType === 'create-profile' ? renderCreateProfileFormInputs() : null }
        <input type='submit' />
      </form>
    )
  }

}

export default AccountForm;
