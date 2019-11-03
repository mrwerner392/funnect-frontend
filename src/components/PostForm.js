import React, { Component, Fragment } from 'react';
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

  renderTopicOptions = () => {
    const { topics } = this.props
    return topics.map(topic => (
      <option key={ topic.id } value={ topic.id }>{ topic.name }</option>
    ))
  }

  render() {
    const { renderNeighborhoodOptions, renderTopicOptions } = this
    return (
      <form>
        Choose Neighborhood:
        <select name='neighborhood'>
          { renderNeighborhoodOptions() }
        </select>
        Choose Topic:
        <select name='topic'>
          { renderTopicOptions() }
        </select>
        Description:
        <textarea name='description' />
        When?
        <Fragment>
          <input type='radio' name='today' value='Today' /><span>Today</span>
          <input type='radio' name='tomorrow' value='Tomorrow' /><span>Tomorrow</span>
        </Fragment>
        Time of Day:
        <input type='text' name='time_of_day' placeholder='e.g. Late Afternoon' />
      </form>
    )
  }

}

const mapStateToProps = state => {
  return {
    neighborhoods: state.neighborhoods,
    topics: state.topics
  }
}

export default connect(mapStateToProps)(PostForm);
