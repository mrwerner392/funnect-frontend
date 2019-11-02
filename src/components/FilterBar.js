import React, { Component } from 'react';

class FilterBar extends Component {

  renderUserFilterBar = () => {
    return <div>user filter</div>
  }

  renderAvailablePostsFilterBar = () => {
    return <div>available posts filter</div>
  }

  renderMyPostsFilterBar = () => {
    return <div>my posts filter</div>
  }

  renderMyEventsFilterBar = () => {
    return <div>my events filter</div>
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
