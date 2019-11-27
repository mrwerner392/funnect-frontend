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
5. Run `bundle install`
6. Run `rails db:create && rails db:migrate && rails db:seed`
  - There are some seeds initialized but add to or adjust these as you'd like!
7. Run `rails s`
  - Make sure this is running on port 3000 (should by default)
8. Find your browser window containing the app and enjoy!
  - Note that for best testing, it is recommended to open two browser windows -- one in a private browser -- and log in to two separate accounts. This app leverages web sockets for live updates and notifications which can only be tested locally using two separate accounts at the same time.

Check back soon for the link to the live application!
