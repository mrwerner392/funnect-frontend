import React, { Component, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setContentType } from '../actions/contentTypeActions';

class ProfileInfo extends Component {

  handleEditProfileClick = () => {
    const { user: {username}, setContentType, history } = this.props
    setContentType('user-edit')
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
      <Fragment>
        <li id='profile-username'>{ username }</li>
        <li id='profile-first-name'>{ first_name }</li>
        <li id='profile-age'>{ age }</li>
        <li id='profile-gender'>{ gender }</li>
        <li id='profile-bio'>{ bio }</li>
        <li id='profile-college'>{ college }</li>
        <li id='profile-occupation'>{ occupation }</li>
        <li id='profile-interests'>{ renderInterests() }</li>
        <button onClick={ handleEditProfileClick } >Edit Profile</button>
      </Fragment>
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
