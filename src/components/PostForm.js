import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createNewPost } from '../actions/myCreatedPostsActions';
import { setContentType } from '../actions/contentTypeActions';

class PostForm extends Component {

  // local state to hold form input values
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
    setContentType('user-posts')
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
      <form id='post-form'
            onChange={ handleChange }
            onSubmit={ handleSubmit }>
        <h1 id='post-form-header'>New Post</h1>
        <p className='post-form-p' >Choose Neighborhood:</p>
        <select className='post-form-select' name='neighborhood' value={ neighborhood }>
          { renderNeighborhoodOptions() }
        </select>
        <p className='post-form-p' >Choose Topic:</p>
        <select className='post-form-select' name='topic' value={ topic }>
          { renderTopicOptions() }
        </select>
        <p className='post-form-p' >Description:</p>
        <textarea id='post-form-text-area' name='description' value={ description }/>
        <p className='post-form-p'>When:</p>
        <div className='post-form-day'>
          <input id='today' className='post-form-radio' type='radio' name='day' value='Today' checked={ day === 'Today' }/>
          <label className='post-form-radio-label' htmlFor='today'>Today</label>
        </div>
        <div className='post-form-day'>
          <input id='tomorrow' className='post-form-radio' type='radio' name='day' value='Tomorrow' checked={ day === 'Tomorrow' }/>
          <label className='post-form-radio-label' htmlFor='tomorrow'>Tomorrow</label>
        </div>
        <p id='time-label' className='post-form-p'>Time of Day:</p>
        <input className='post-form-input' type='text' name='time_of_day' value={ time_of_day } placeholder='e.g. Late Afternoon' />
        <input className='submit' type='submit' value='Create Post'/>
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
