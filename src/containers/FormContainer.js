import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountForm from '../components/AccountForm';
import { userLoginRequest } from '../actions/userActions';

class FormContainer extends Component {

  renderAccountForm = () => {
    const { userLoginRequest } = this.props
    return <AccountForm userLoginRequest={ userLoginRequest }/>
  }

  renderPostForm = () => {
    return <div>Hi</div>
  }

  render() {
    const { renderAccountForm, renderPostForm } = this
    return (
      <div>
        { true ? renderAccountForm() : renderPostForm() }
      </div>
    )
  }

}

const mapDispatchToProps = {
  userLoginRequest
}

export default connect(null, mapDispatchToProps)(FormContainer)
