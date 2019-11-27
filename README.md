# Funnect

This is the frontend repository for Funnect. You can find the backend repository [here](https://github.com/mrwerner392/funnect-backend).

## Summary

The motivation behind this app is to use technology as a means of driving in-person interactions. Through this app, users can make a post about something they would like to do with other people. This could be a coffee chat about their favorite topic, walking dogs in the park, after work drinks, etc. Other users can then express interest in the post. If the creator of a post has interest from other users, they can make an event and invite the interested users of their choosing. Attending users can then chat through the event's page to set up a specific time and location.

## Installation

To test locally, follow these steps:

1. Open a terminal window, clone this repository to your local machine and navigate into the directory
2. Run `npm install`
3. Run `npm start`
  - Default port is 3001, but can use any port besides 3000 (reserved for rails server)
  - This should automatically open a browser window containing the application
4. In a new terminal window, clone the backend repository to your local machine (found [here](https://github.com/mrwerner392/funnect-backend)) and navigate into the directory
5. Open the backend repository in the editor of your choice and add a file in the root directory called '.env'
6. In this file, create a JWT_SECRET_KEY with `JWT_SECRET_KEY='<your key here>'`
7. Back in the terminal run `bundle install`
8. Run `rails db:create && rails db:migrate && rails db:seed`
  - There are some seeds initialized but add to or adjust these as you'd like!
9. Run `rails s`
  - Make sure this is running on port 3000 (should by default)
10. Find your browser window containing the app and enjoy!
  - Note that for best testing, it is recommended to open two browser windows -- one in a private browser -- and log in to two separate accounts (you can access sample account usernames and passwords in the seeds file or create your own accounts). This app leverages web sockets for live updates and notifications which can only be tested locally using two separate accounts at the same time.

Check back soon for the link to the live application!

## Features

### Account
- Log in or create a profile
- Click your username in the nav bar to view and edit your profile

### Creating Posts and Events
- Click 'New Post' in the nav bar to create a new post with a topic, location (current options are NYC neighborhoods), description, and general time of day
  - Can only make a post for something you want to do today or tomorrow
- This post will appear in the 'My Posts' section of your profile page
- When at least one other user has shown interest in your post, you will be able to create an event for that post
- To create an event:
  - First click 'Manage Post' at the bottom of the post
  - Then add/remove the users you want to invite
  - When have chosen the invitees, click 'Create Event'
- The event will appear in the 'My Events' section of your profile page (as well as the 'My Events' section of all the invitees' profile pages)
- As host of the event, you will be able to update the specific time and location after chatting with the other attendees

### Viewing others' posts
- To view all the available posts made by other users, click 'Posts' in the nav bar
- You can filter these posts by topic and location
- If you see a post you are interested in, click the 'I'm Interested' button
  - This post will now appear in the 'My Posts' section of your profile page
  - The creator of the post may choose to create and event and invite you, in which case you can find the event in the 'My Events' section of your profile page and can chat with the host and any other event attendees

### Viewing my posts and events
- Any post that you created or expressed interest in will appear in the 'My Posts' section of your profile page
  - To navigate here, click your username in the nav bar then click 'My Posts'
  - Once here, you can see the active posts (that are for today or tomorrow) or you can view posts that have expired
  - If you are the creator of a post, you can click 'Manage Post' to create an event or 'View Event for this Post' to go to the event's page (if already created)
- Like posts, any event that you created or were invited to will appear in the 'My Events' section of your profile page
  - To navigate here, click your username in the nav bar then click 'My Events'
  - Can see active events or filter for old ones
  - Can click 'View Event' to go to a specific event's page
    - Can chat with other attendees here and can update the time and location if you are the host

### Live notifications
- This app uses web sockets to provide live updates and notifications, including:
  - Notification in nav bar if there are new posts
  - Notification in nav bar if you have new users interested in one of your posts or if you have new messages in one of your events
    - Notification will also appear in the 'My Posts' or 'My Events' button on your profile page as appropriate
  - If you have new interested users for one of your posts, a notification will also appear at the top of that post item in your 'My Posts' page
  - If you get invited to an event, a notification will appear at the top of the page
- Note that some notifications will only appear when you are navigated away from the relevant page
  - For example, if you are on your profile page already, you will not get a notification in the nav bar that you have updates

## Technologies

- React / React Router
- Redux / Redux Thunk
- React Action Cable Provider / Web Sockets
- Vanilla CSS

## Author

This application -- across the entire stack -- was planned, designed, and created by [Matt Werner](https://github.com/mrwerner392).
