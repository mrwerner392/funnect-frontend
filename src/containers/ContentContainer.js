import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterBar from '../components/FilterBar';
import ContentDisplay from './ContentDisplay';
import { setCreatedPostsFilter } from '../actions/myCreatedPostsActions';
import { setPostsInterestedInFilter } from '../actions/postsImInterestedInActions';
import { setEventsHostingFilter } from '../actions/eventsImHostingActions';
import { setEventsAttendingFilter } from '../actions/eventsImAttendingActions';

class ContentContainer extends Component {

  handleFilter = evt => {
    const { props: {contentType,
                    setCreatedPostsFilter,
                    setPostsInterestedInFilter,
                    setEventsHostingFilter,
                    setEventsAttendingFilter} } = this
    const filter = evt.target.value

    switch (contentType) {
      case 'user-posts':
        setCreatedPostsFilter(filter)
        setPostsInterestedInFilter(filter)
        break
      case 'user-events':
        setEventsHostingFilter(filter)
        setEventsAttendingFilter(filter)
        break
      default:
        break
    }
  }

  render() {
    const { props: {contentType, user}, handleFilter } = this
    return (
      <div id='content-container'>
        <FilterBar handleFilter={ handleFilter }/>
        <ContentDisplay />
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user,
    contentType: state.contentType
  }
}

const mapDispatchToProps = {
  setCreatedPostsFilter,
  setPostsInterestedInFilter,
  setEventsHostingFilter,
  setEventsAttendingFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer)
