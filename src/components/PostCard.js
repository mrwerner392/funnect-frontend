import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { newEventHosting } from '../actions/eventsImHostingActions';
import { toggleNewInterestedUsersExist } from '../actions/myCreatedPostsActions';
import { toggleHasNewInfo } from '../actions/userActions';

class PostCard extends Component {

  state = {
    attendees: []
  }

  handleCreateEvent = postId => {
    const { props: {newEventHosting}, state: {attendees} } = this
    newEventHosting({post_id: postId, user_id: localStorage.id, attendees})
  }

  handleAddToEventList = id => {
    this.setState(prevState => {
      return {
        attendees: [...prevState.attendees, id]
      }
    })
  }

  handleBackToPostsClick = () => {
    const { user,
            newInterestedUsersExist,
            toggleNewInterestedUsersExist,
            eventsHostingNewMessagesExist,
            eventsAttendingNewMessagesExist,
            toggleHasNewInfo,
            history } = this.props

    if (newInterestedUsersExist) {
      toggleNewInterestedUsersExist()
    }

    const userHasNewMessages = (
      eventsHostingNewMessagesExist || eventsAttendingNewMessagesExist
    )

    if (user.hasNewInfo && !userHasNewMessages) {
      toggleHasNewInfo()
    }

    history.push(`/${user.username}/posts`)
  }

  renderInterestedUsers = post => {
    const {state: {attendees}, handleAddToEventList} = this
    return(
      <Fragment>
        {
          post.interested_users.map(user => (
            <div key={ user.id }>
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
    const { state: {attendees},
            props: {renderProps, currentPost},
            handleCreateEvent, renderInterestedUsers } = this

    return (
        <Fragment>
          <p>{ currentPost.topic.name }</p>
          <p>{ currentPost.neighborhood.name }</p>
          <p>{ currentPost.user.username }</p>
          <p>{ currentPost.status }</p>
          { renderInterestedUsers(currentPost) }
          <button disabled={ attendees.length ? false : true } onClick={ () => handleCreateEvent(currentPost.id) }>Create Event</button>
        </Fragment>
    )
  }

  render() {
    const { props: {currentPost}, renderPost, handleBackToPostsClick } = this

    return (
      <div>
        <button onClick={ handleBackToPostsClick }>Back to My Posts</button>
        { Object.keys(currentPost).length ? renderPost() : null }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user,
    currentPost: state.currentPost,
    newInterestedUsersExist: state.createdPosts.newInterestedUsersExist,
    eventsHostingNewMessagesExist: state.eventsHosting.newMessagesExist,
    eventsAttendingNewMessagesExist: state.eventsAttending.newMessagesExist
  }
}

const mapDispatchToProps = {
  newEventHosting,
  toggleNewInterestedUsersExist,
  toggleHasNewInfo
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCard))
