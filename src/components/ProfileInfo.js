import React, { Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setContentType } from '../actions/contentTypeActions';

const ProfileInfo = props => {

  const { username,
          first_name,
          age,
          gender,
          bio,
          college,
          occupation,
          interests } = props.user

  const renderInterests = () => {
    const interestNames = interests.map(interest => interest.name)
    return interestNames.join(', ')
  }

  return (
    <div id='profile-info-display'>
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
      <p className='profile-info-item profile-info-bottom' id='profile-interests'>{ renderInterests() }</p>
    </div>
  )

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
