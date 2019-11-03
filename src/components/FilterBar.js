import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAvailablePostsTopicFilter, setAvailablePostsNeighborhoodFilter } from '../actions/availablePostsActions'

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
    const { renderAvailablePostsTopicFilter,
            renderAvailablePostsNeighborhoodFilter } = this
    return (
      <div>
        <div>
          Topic Filter: { renderAvailablePostsTopicFilter() }
        </div>
        <div>
          Topic Filter: { renderAvailablePostsNeighborhoodFilter() }
        </div>
      </div>
    )
  }

  renderAvailablePostsTopicFilter = () => {
    const { props: {topics}, handleAvailablePostsFilterChange } = this
    return (
      <select name='topics' onChange={ handleAvailablePostsFilterChange }>
        { topics.map(topic => <option key={ topic.id } value={ topic.name }>{ topic.name }</option>) }
      </select>
    )
  }

  renderAvailablePostsNeighborhoodFilter = () => {
    const { props: {neighborhoods}, handleAvailablePostsFilterChange } = this
    return (
      <select name='neighborhoods' onChange={ handleAvailablePostsFilterChange }>
        { neighborhoods.map(neighborhood => <option key={ neighborhood.id } value={ neighborhood.name }>{ neighborhood.name }</option>) }
      </select>
    )
  }

  handleAvailablePostsFilterChange = evt => {
    const { name, value } = evt.target
    const { setAvailablePostsTopicFilter, setAvailablePostsNeighborhoodFilter } = this.props
    console.log(name, value);
    name === 'topics'
      ? setAvailablePostsTopicFilter(value)
      : setAvailablePostsNeighborhoodFilter(value)
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
    const { handleFilter } = this.props
    return (
      <div>
        <button className='filter-button' value='active' onClick={ handleFilter }>Active</button>
        <button className='filter-button' value='past' onClick={ handleFilter }>Past</button>
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

const mapStateToProps = state => {
  return {
    topics: state.topics,
    neighborhoods: state.neighborhoods
  }
}

const mapDispatchToProps = {
  setAvailablePostsTopicFilter,
  setAvailablePostsNeighborhoodFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar)
