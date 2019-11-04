import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfileInfoEditForm extends Component {

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
    // const {  } = this.state
    console.log('update');
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
      <form onChange={ handleChange }
            onSubmit={ handleSubmit }
            >
        { errors ? <p>{ errors }</p> : null}
        <input type='text'
                name='username'
                value={ username }
                placeholder='username'
                />
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
                name='gender'
                value={ gender }
                placeholder='gender'
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
          {
            interestOptions.map(interest => {
              return <option key={ interest.id } value={ interest.name }>{ interest.name }</option>
            })
          }
        </select>
        <p>{ interests.join(', ') }</p>
        <input type='submit' />
      </form>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user,
    interestOptions: state.interests
  }
}

export default connect(mapStateToProps)(ProfileInfoEditForm);
