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

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    const { state: {neighborhood,
                    topic,
                    description,
                    day,
                    time_of_day},
            renderNeighborhoodOptions, renderTopicOptions, handleChange } = this

    return (
      <form onChange={ handleChange }>
        Choose Neighborhood:
        <select name='neighborhood' value={ neighborhood }>
          { renderNeighborhoodOptions() }
        </select>
        Choose Topic:
        <select name='topic' value={ topic }>
          { renderTopicOptions() }
        </select>
        Description:
        <textarea name='description' value={ description }/>
        When?
        <Fragment>
          <input type='radio' name='day' value='Today' checked={ day === 'Today' }/><span>Today</span>
          <input type='radio' name='day' value='Tomorrow' checked={ day === 'Tomorrow' }/><span>Tomorrow</span>
        </Fragment>
        Time of Day:
        <input type='text' name='time_of_day' value={ time_of_day } placeholder='e.g. Late Afternoon' />
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
