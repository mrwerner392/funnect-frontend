import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setUser } from '../actions/userActions';
import { setContentType } from '../actions/contentTypeActions';

const URL = 'http://localhost:3000'

class ProfileInfoEditForm extends Component {

  state = {
    username: '',
    first_name: '',
    age: '',
    gender: '',
    bio: '',
    college: '',
    occupation: '',
    interests: [],
    errors: null
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

  handleSubmit = evt => {
    evt.preventDefault();
    const { state: {username,
                    first_name,
                    age,
                    gender,
                    bio,
                    college,
                    occupation,
                    interests},
            props: {user, setUser} } = this
    const userInterests = user.interests.map(interest => interest.name)
    const new_interests =
              interests.sort().join('') === userInterests.sort().join('')
              ? null
              : interests
    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.token
      },
      body: JSON.stringify({ username, first_name, age, gender, bio, college, occupation, new_interests })
    }

    fetch(URL + `/users/${user.id}`, config)
    .then(res => res.json())
    .then(user => setUser(user))
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
      <p className='acct-form-interest' key={ interest }>
        { interest }
        <span className='interest-delete'><button className='interest-delete' type='button' onClick={ () => handleRemoveInterest(index) }>x</button></span>
      </p>
    ))
  }

  componentDidMount() {
    const { username,
            first_name,
            age,
            gender,
            bio,
            college,
            occupation,
            interests } = this.props.user
    const interestNames = interests.map(interest => interest.name)
    this.setState({
      username,
      first_name,
      age,
      gender,
      bio,
      college,
      occupation,
      interests: interestNames
    })
  }

  render() {
    console.log(this.state.interests);
    const { state: {username,
                    first_name,
                    age,
                    gender,
                    bio,
                    college,
                    occupation,
                    interests,
                    errors},
            props: {user,
                    interestOptions,
                    setContentType},
            handleChange,
            handleSubmit,
            renderInterests } = this

    return (
      <div className='account-form-container'>
        <form className='account-form'
              onChange={ handleChange }
              onSubmit={ handleSubmit }
              >
          <h1 className='acct-form-header'>Edit Profile</h1>
          { errors ? <p>{ errors }</p> : null}
          <input className='acct-form-input'
                  type='text'
                  name='username'
                  value={ username || user.username }
                  />
          <input className='acct-form-input'
                  type='text'
                  name='first_name'
                  value={ first_name || user.first_name}
                  />
          <input className='acct-form-input'
                  type='number'
                  name='age'
                  value={ age || user.age }
                  />
          <input className='acct-form-input'
                  type='text'
                  name='gender'
                  value={ gender || user.gender }
                  />
          <input className='acct-form-input'
                  type='text'
                  name='bio'
                  value={ bio || user.bio }
                  />
          <input className='acct-form-input'
                  type='text'
                  name='college'
                  value={ college || user.college }
                  />
          <input className='acct-form-input'
                  type='text'
                  name='occupation'
                  value={ occupation || user.occupation }
                  />
                <p className='acct-form-label'>Choose up to 5 Interests</p>
          <select className='acct-form-select' name='interests' value={ interests[interests.length - 1] }>
            { <option></option> }
            {
              interestOptions.map(interest => {
                return <option key={ interest.id } value={ interest.name }>{ interest.name }</option>
              })
            }
          </select>
          <p>{ renderInterests() }</p>
          <input type='submit' className='submit'/>
        </form>
        <p className='acct-form-footer'>
          <NavLink className='link'
                    exact
                    to={ `/${ user.username }` }
                    onClick={ () => setContentType('user') }
                    >
            Cancel
          </NavLink>
        </p>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user,
    interestOptions: state.interests
  }
}

const mapDispatchToProps = dispatch => {
  return{
    setUser: user => dispatch(setUser(user)),
    setContentType: type => dispatch(setContentType(type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfoEditForm);
