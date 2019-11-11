import React, { Component, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setContentType } from '../actions/contentTypeActions';

class ProfileInfo extends Component {

  handleEditProfileClick = () => {
    const { user: {username}, setContentType, history } = this.props
    // setContentType('user-edit')
    history.push(`/${username}/edit`)
  }

  renderInterests = () => {
    const { interests } = this.props.user
    const interestNames = interests.map(interest => interest.name)
    return interestNames.join(', ')
  }

  render() {
    const { props: {
              user: {
                username,
                first_name,
                age,
                gender,
                bio,
                college,
                occupation
              }
            },
            renderInterests,
            handleEditProfileClick } = this

    return (
      <div id='profile-info-display'>
        <button className='edit-profile-button' onClick={ handleEditProfileClick } >Edit Profile</button>
        <h4 className='profile-info-label'>Username</h4>
        <p className='profile-info-item' id='profile-username'>{ username }</p>
        <h4 className='profile-info-label'>First Name</h4>
        <p className='profile-info-item' id='profile-first-name'>{ first_name }</p>
        <h4 className='profile-info-label'>Age</h4>
        <p className='profile-info-item' id='profile-age'>{ age }</p>
        <h4 className='profile-info-label'>Gender</h4>
        <p className='profile-info-item' id='profile-gender'>{ gender }</p>
        <h4 className='profile-info-label'>Bio</h4>
        <p className='profile-info-item' id='profile-bio'>{ bio }</p>
        <h4 className='profile-info-label'>College</h4>
        <p className='profile-info-item' id='profile-college'>{ college }</p>
        <h4 className='profile-info-label'>Occupation</h4>
        <p className='profile-info-item' id='profile-occupation'>{ occupation }</p>
        <h4 className='profile-info-label'>Interests</h4>
        <p className='profile-info-item' id='profile-interests'>{ renderInterests() }</p>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setContentType
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileInfo))
