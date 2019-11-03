import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createNewPost } from '../actions/myCreatedPostsActions'

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

  handleSubmit = evt => {
    evt.preventDefault()
    const { createNewPost } = this.props
    createNewPost({ ...this.state, id: localStorage.id })
  }

  render() {
    const { state: {neighborhood,
                    topic,
                    description,
                    day,
                    time_of_day},
            renderNeighborhoodOptions,
            renderTopicOptions,
            handleChange,
            handleSubmit } = this

    return (
      <form onChange={ handleChange } onSubmit={ handleSubmit }>
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
        <input type='submit' />
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

const mapDispatchToProps = {
  createNewPost
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
