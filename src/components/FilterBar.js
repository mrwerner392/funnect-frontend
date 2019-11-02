import React, { Component } from 'react';

class FilterBar extends Component {

  renderUserFilterBar = () => {
    return (
      <div>
        <button className='filter-button'>Posts</button>
        <button className='filter-button'>Events</button>
      </div>
    )
  }

  renderAvailablePostsFilterBar = () => {
    return (
      <div>
        Available Posts Filter
      </div>
    )
  }

  renderMyPostsFilterBar = () => {
    return (
      <div>
        <button className='filter-button'>Active</button>
        <button className='filter-button'>Past</button>
      </div>
    )
  }

  renderMyEventsFilterBar = () => {
    return (
      <div>
        <button className='filter-button'>Active</button>
        <button className='filter-button'>Past</button>
      </div>
    )
  }

  renderFilterBar = () => {
    const { props: {contentType},
            renderUserFilterBar,
            renderAvailablePostsFilterBar,
            renderMyPostsFilterBar,
            renderMyEventsFilterBar } = this

    switch (contentType) {
      case 'user':
        return renderUserFilterBar()
      case 'posts':
        return renderAvailablePostsFilterBar()
      case 'user-posts':
        return renderMyPostsFilterBar()
      case 'user-events':
        return renderMyEventsFilterBar()
      default:
        return null
    }
  }

  render() {
    const { renderFilterBar } = this

    return (
      <div id='filter-bar'>
        { renderFilterBar() }
      </div>
    )
  }

}

export default FilterBar
