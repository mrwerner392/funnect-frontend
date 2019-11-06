import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setUser } from '../actions/userActions'

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
    console.log('change');
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
    console.log('submit');
    evt.preventDefault();
    const { state: {username,
                    first_name,
                    age,
                    gender,
                    bio,
                    college,
                    occupation,
                    interests},
            props: {user, dispatch, setUser} } = this
    const userInterests = user.interests.map(interest => interest.name)
    const new_interests =
              interests.sort().join('') === userInterests.sort().join('')
              ? null
              : interests
    console.log(new_interests);
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
    // .then(console.log)
    .then(user => setUser(user))
  }

  handleRemoveInterest = index => {
    console.log('remove');
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
                    interestOptions},
            handleChange,
            handleSubmit,
            renderInterests } = this

    return (
      <Fragment>
        <form onChange={ handleChange }
              onSubmit={ handleSubmit }
              >
          { errors ? <p>{ errors }</p> : null}
          <input type='text'
                  name='username'
                  value={ username || user.username }
                  />
          <input type='text'
                  name='first_name'
                  value={ first_name || user.first_name}
                  />
          <input type='number'
                  name='age'
                  value={ age || user.age }
                  />
          <input type='text'
                  name='gender'
                  value={ gender || user.gender }
                  />
          <input type='text'
                  name='bio'
                  value={ bio || user.bio }
                  />
          <input type='text'
                  name='college'
                  value={ college || user.college }
                  />
          <input type='text'
                  name='occupation'
                  value={ occupation || user.occupation }
                  />
          <label htmlFor='user-interest-select'>Choose up to 5 Interests</label>
          <select id='user-interest-select' name='interests' value={ interests[interests.length - 1] }>
            { <option></option> }
            {
              interestOptions.map(interest => {
                return <option key={ interest.id } value={ interest.name }>{ interest.name }</option>
              })
            }
          </select>
          <p>{ renderInterests() }</p>
          <input type='submit' />
        </form>
        <NavLink exact to={ `/${ user.username }` } >Cancel</NavLink>
      </Fragment>
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
    setUser: user => dispatch(setUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfoEditForm);
