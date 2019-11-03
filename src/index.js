import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import availablePostsReducer from './reducers/availablePostsReducer';
import myCreatedPostsReducer from './reducers/myCreatedPostsReducer';
import postsImInterestedInReducer from './reducers/postsImInterestedInReducer';
import eventsImHostingReducer from './reducers/eventsImHostingReducer';
import eventsImAttendingReducer from './reducers/eventsImAttendingReducer';
import topicsReducer from './reducers/topicsReducer';
import neighborhoodsReducer from './reducers/neighborhoodsReducer';
import interestsReducer from './reducers/interestsReducer';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

const reducer = combineReducers({
  user: userReducer,
  availablePosts: availablePostsReducer,
  createdPosts: myCreatedPostsReducer,
  postsInterestedIn: postsImInterestedInReducer,
  eventsHosting: eventsImHostingReducer,
  eventsAttending: eventsImAttendingReducer,
  topics: topicsReducer,
  neighborhoods: neighborhoodsReducer,
  interests: interestsReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Router>
    <Provider store={ store }>
      <App />
    </Provider>
  </Router>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
