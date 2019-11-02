import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterBar from '../components/FilterBar';
import ContentDisplay from './ContentDisplay';
import { setCreatedPostsFilter } from '../actions/myCreatedPostsActions';
import { setPostsInterestedInFilter } from '../actions/postsImInterestedInActions';

class ContentContainer extends Component {

  handleFilter = evt => {
    const { props: {contentType,
                    setCreatedPostsFilter,
                    setPostsInterestedInFilter} } = this
    const filter = evt.target.value

    switch (contentType) {
      case 'user-posts':
        setCreatedPostsFilter(filter)
        setPostsInterestedInFilter(filter)
        break
      default:
        break
    }
  }

  render() {
    const { props: {contentType, user}, handleFilter } = this
    return (
      <div id='content-container'>
        <FilterBar contentType={ contentType } user={ user } handleFilter={ handleFilter }/>
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

const mapDispatchToProps = {
  setCreatedPostsFilter,
  setPostsInterestedInFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer)
