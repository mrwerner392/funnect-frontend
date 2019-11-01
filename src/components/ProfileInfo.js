import React, { Component, Fragment } from 'react';

class ProfileInfo extends Component {

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
            renderInterests } = this

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
      </Fragment>
    )
  }

}

export default ProfileInfo
