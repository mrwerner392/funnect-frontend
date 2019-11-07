import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addAvailablePost } from '../actions/availablePostsActions';
import { addPostInterestedIn } from '../actions/postsImInterestedInActions';
import { removeAvailablePost } from '../actions/availablePostsActions';
import { removePostInterestedIn } from '../actions/postsImInterestedInActions';

class Post extends Component {

  handleInterestedClick = post => {
    const { user, addPostInterestedIn, removeAvailablePost } = this.props
    addPostInterestedIn(post.id, user.id)
    removeAvailablePost(post.id)
  }

  handleNotInterestedClick = post => {
    const { user, addAvailablePost, removePostInterestedIn } = this.props
    addAvailablePost(post, user.id)
    removePostInterestedIn(post.id, user.id)
  }

  handleManagePostClick = () => {
    const { post, user: {username}, history } = this.props
    history.push(`/${username}/posts/${post.id}`)
  }

  renderUserInterests = interests => {
    const interestNames = interests.map(interest => interest.name)
    return interestNames.join(', ')
  }

  renderPostFooter = () => {
    const { props: {post, user},
            handleInterestedClick,
            handleNotInterestedClick,
            handleManagePostClick } = this
    const interestedIds = post.interested_users.map(user => user.id)

    if (post.user.id === user.id) {
      return (
        <p>{ interestedIds.length } users are interested <span><button onClick={ handleManagePostClick }>Manage Post</button></span></p>
      )
    } else if (interestedIds.includes(user.id)) {
      return (
        <p>You and { interestedIds.length - 1 } others are interested<span><button onClick={ () => handleNotInterestedClick(post) }>{ "I'm Not Interested" }</button></span></p>
      )
    } else {
      return (
        <p>{ interestedIds.length } users are interested <span><button onClick={ () => handleInterestedClick(post) }>{ "I'm Interested" }</button></span></p>
      )
    }
  }

  render() {
    const { props: {post, user}, renderUserInterests, renderPostFooter } = this
    return (
      <div className='post'>
        <p>{ post.topic.name }</p>
        <p>{ post.neighborhood.name }</p>
        <p>{ post.time_of_day }</p>
        <p>{ post.description }</p>
        <h4>Poster:</h4>
        <p>{ `${post.user.username}, ${post.user.age}, ${post.user.occupation}` }</p>
        <p>{ `"${post.user.bio}"` }</p>
        <p>Likes: { renderUserInterests(post.user.interests) }</p>
        { renderPostFooter() }
        {/*
          post.user.id === user.id
          ? <NavLink exact to={ `/${user.username}/posts/${post.id}` }>Manage Post</NavLink>
          : null
        */}
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  addAvailablePost,
  addPostInterestedIn,
  removeAvailablePost,
  removePostInterestedIn
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))
