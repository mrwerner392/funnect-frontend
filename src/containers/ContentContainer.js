import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterBar from '../components/FilterBar';
import ContentDisplay from './ContentDisplay'

class ContentContainer extends Component {

  render() {
    const { props: {contentType, user} } = this
    return (
      <div id='content-container'>
        <FilterBar contentType={ contentType } user={ user }/>
        <ContentDisplay contentType={ contentType } />
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(ContentContainer)
