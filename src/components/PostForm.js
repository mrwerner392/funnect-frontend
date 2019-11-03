import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostForm extends Component {

  state = {
    neighborhood: '',
    topic: '',
    description: '',
    day: '',
    time_of_day: ''
  }

  renderNeighborhoodOptions = () => {
    const { neighborhoods } = this.props
    return neighborhoods.map(neighborhood => (
      <option key={ neighborhood.id } value={ neighborhood.id }>{ neighborhood.name }</option>
    ))
  }

  render() {
    const { renderNeighborhoodOptions } = this
    return (
      <form>
        Choose Neighborhood:
        <select>
          { renderNeighborhoodOptions() }
        </select>
      </form>
    )
  }

}

const mapStateToProps = state => {
  return {
    neighborhoods: state.neighborhoods
  }
}

export default connect(mapStateToProps)(PostForm);
