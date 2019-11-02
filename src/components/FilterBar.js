import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class FilterBar extends Component {

  renderUserFilterBar = () => {
    // buttons here for page redirect, not actual filtering
    const { username } = this.props.user
    return (
      <div>
        <NavLink exact to={ `/${ username }/posts` } className='user-navlink'>Posts</NavLink>
        <NavLink exact to={ `/${ username }/events` } className='user-navlink'>Events</NavLink>
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
    const { handleFilter } = this.props
    return (
      <div>
        <button className='filter-button' value='active' onClick={ handleFilter }>Active</button>
        <button className='filter-button' value='past' onClick={ handleFilter }>Past</button>
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
