import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class PostCard extends Component {

  state = {
    attendees: []
  }

  handleCreateEvent = () => {
    console.log('clicked');
  }

  handleAddToEventList = id => {
    this.setState(prevState => {
      return {
        attendees: [...prevState.attendees, id]
      }
    })
  }

  renderInterestedUsers = post => {
    const {state: {attendees}, handleAddToEventList} = this
    return(
      <Fragment>
        {
          post.interested_users.map(user => (
            <div>
              <p>{ user.username }</p>
              <p>{ user.age }</p>
              <p>{ user.gender }</p>
              <p>{ user.bio }</p>
              <p>{ user.college }</p>
              <p>{ user.occupation }</p>
              <button onClick={ () => handleAddToEventList(user.id) }>Add to Event List</button>
            </div>
          ))
        }
      </Fragment>
    )
  }

  renderPost = () => {
    console.log(this.state.attendees.length);
    const { state: {attendees},
            props: {renderProps, createdPosts},
            handleCreateEvent, renderInterestedUsers } = this
    const postId = renderProps.match.params.postSlug
    const post = createdPosts.find(post => post.id === parseInt(postId, 10))
    console.log(post);

    return (
        <Fragment>
          <p>{ post.topic.name }</p>
          <p>{ post.neighborhood.name }</p>
          <p>{ post.user.username }</p>
          <p>{ post.status }</p>
          { renderInterestedUsers(post) }
          <button disabled={ attendees.length ? null : 'true' } onClick={ handleCreateEvent }>Create Event</button>
        </Fragment>
    )
  }

  render() {
    const { props: {createdPosts}, renderPost } = this

    return (
      <div>
        { createdPosts.length ? renderPost() : null }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    createdPosts: state.createdPosts.posts
  }
}

export default connect(mapStateToProps)(PostCard)
