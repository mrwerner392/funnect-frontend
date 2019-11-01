import React, { Component } from 'react';

class FilterBar extends Component {

  render() {
    return (
      <div id='filter-bar'>
        FilterBar for { this.props.contentType }
      </div>
    )
  }

}

export default FilterBar
