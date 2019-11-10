import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class AccountForm extends Component {

  state = {
    username: '',
    password: '',
    first_name: '',
    age: null,
    gender: '',
    bio: '',
    college: '',
    occupation: '',
    interests: [],
  }

  handleChange = evt => {
    if (evt.target.name === 'interests') {
      const interest = evt.target.value
      this.setState(prevState => {
        return {
          interests: [...prevState.interests, interest]
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
    this.props.handleLoginRequest({ username, password })
  }

  handleCreateSubmit = evt => {
    evt.preventDefault();
    const { username, password, first_name, age, gender, bio, college, occupation, interests } = this.state
    this.props.handleCreateUserRequest({ username, password, first_name, age, gender, bio, college, occupation, interests })
  }

  handleRemoveInterest = index => {
    this.setState(prevState => {
      return {
        interests: [
          ...prevState.interests.slice(0, index),
          ...prevState.interests.slice(index + 1)
        ]
      }
    })
  }

  renderInterests = () => {
    const { state: {interests}, handleRemoveInterest } = this
    return interests.map((interest, index) => (
      <li key={ interest }>
        { interest }
        <button type='button' onClick={ () => handleRemoveInterest(index) }>x</button>
      </li>
    ))
  }

  renderCreateProfileFormInputs = () => {
    const { state: {first_name,
                    age,
                    gender,
                    bio,
                    college,
                    occupation,
                    interests},
            props: {interestOptions},
            renderInterests } = this

    return (
      <Fragment>
        <input className='acct-form-input'
                type='text'
                name='first_name'
                value={ first_name }
                placeholder='first name'
                />
        <input className='acct-form-input'
                type='number'
                name='age'
                value={ age }
                placeholder='age'
                />
        <input className='acct-form-input'
                type='text'
                name='gender'
                value={ gender }
                placeholder='gender'
                />
        <input className='acct-form-input'
                type='text'
                name='bio'
                value={ bio }
                placeholder='bio'
                />
        <input className='acct-form-input'
                type='text'
                name='college'
                value={ college }
                placeholder='college'
                />
        <input className='acct-form-input'
                type='text'
                name='occupation'
                value={ occupation }
                placeholder='occupation'
                />
        <p className='acct-form-label' >Choose up to 5 Interests</p>
        <select className='acct-form-select' name='interests'>
          { <option></option> }
          {
            interestOptions.map(interest => {
              return <option key={ interest.id } value={ interest.name }>{ interest.name }</option>
            })
          }
        </select>
        <p>{ renderInterests() }</p>
      </Fragment>
    )

  }

  render() {
    const { state: {username, password},
            props: {formType, errors},
            handleChange,
            handleLoginSubmit,
            handleCreateSubmit,
            renderCreateProfileFormInputs } = this

    return (
      <form className='account-form'
            onChange={ handleChange }
            onSubmit={ formType === 'login' ? handleLoginSubmit : handleCreateSubmit }>
        <h1 className='acct-form-header'>{ formType === 'login' ? 'Log In' : 'Create Profile' }</h1>
        { errors ? <p>{ errors }</p> : null}
        <input className='acct-form-input'
                type='text'
                name='username'
                value={ username }
                placeholder='username'
                />
        <input className='acct-form-input'
                type='password'
                name='password'
                value={ password }
                placeholder='password'
                />
        { formType === 'create-profile' ? renderCreateProfileFormInputs() : null }
        <input type='submit' className='submit' />
      </form>
    )
  }

}

const mapStateToProps = state => {
  return {
    interestOptions: state.interests
  }
}

export default connect(mapStateToProps)(AccountForm);
