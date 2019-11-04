import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setUser } from '../actions/userActions'

const URL = 'http://localhost:3000'

class ProfileInfoEditForm extends Component {

  state = {
    username: '',
    first_name: '',
    age: null,
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
    console.log('update');
    const { state: {username,
                    first_name,
                    age,
                    gender,
                    bio,
                    college,
                    occupation,
                    interests},
            props: {user, dispatch, setUser} } = this
    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.token
      },
      body: JSON.stringify({ username, first_name, age, gender, bio, college, occupation, interests })
    }

    fetch(URL + `/users/${user.id}`, config)
    .then(res => res.json())
    .then(user => setUser(user))
  }

  render() {
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
            handleSubmit } = this

    return (
      <Fragment>
        <form onChange={ handleChange }
              onSubmit={ handleSubmit }
              >
          { errors ? <p>{ errors }</p> : null}
          <input type='text'
                  name='username'
                  value={ user.username }
                  placeholder='username'
                  />
          <input type='text'
                  name='first_name'
                  value={ user.first_name }
                  placeholder='first name'
                  />
          <input type='number'
                  name='age'
                  value={ user.age }
                  placeholder='age'
                  />
          <input type='text'
                  name='gender'
                  value={ user.gender }
                  placeholder='gender'
                  />
          <input type='text'
                  name='bio'
                  value={ user.bio }
                  placeholder='bio'
                  />
          <input type='text'
                  name='college'
                  value={ user.college }
                  placeholder='college'
                  />
          <input type='text'
                  name='occupation'
                  value={ user.occupation }
                  placeholder='occupation'
                  />
          {/*<label htmlFor='user-interest-select'>Choose up to 5 Interests</label>
          <select id='user-interest-select' name='interests'>
            { <option></option> }
            {
              interestOptions.map(interest => {
                return <option key={ interest.id } value={ interest.name }>{ interest.name }</option>
              })
            }
          </select>
          <p>{ interests.join(', ') }</p>*/}
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
