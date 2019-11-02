import React, { Component } from 'react';
import FilterBar from '../components/FilterBar';
import ContentDisplay from './ContentDisplay'

class ContentContainer extends Component {

  render() {
    return (
      <div id='content-container'>
        <FilterBar contentType={ this.props.contentType } />
        <ContentDisplay contentType={ this.props.contentType } />
      </div>
    )
  }

}

export default ContentContainer
