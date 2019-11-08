import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createNewPost } from '../actions/myCreatedPostsActions';
import { setContentType } from '../actions/contentTypeActions';

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
    return (
      <Fragment>
        <option></option>
        { neighborhoods.map(neighborhood => <option key={ neighborhood.id } value={ neighborhood.id }>{ neighborhood.name }</option>) }
      </Fragment>
    )
  }

  renderTopicOptions = () => {
    const { topics } = this.props
    return (
      <Fragment>
        <option></option>
        { topics.map(topic => <option key={ topic.id } value={ topic.id }>{ topic.name }</option>) }
      </Fragment>
    )
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const { user, createNewPost, setContentType, history } = this.props
    createNewPost({ ...this.state, id: localStorage.id })
    setContentType('posts')
    history.push(`/${user.username}/posts`)
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
    user: state.user,
    neighborhoods: state.neighborhoods,
    topics: state.topics
  }
}

const mapDispatchToProps = {
  createNewPost,
  setContentType
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));
