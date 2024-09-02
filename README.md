## React simpleDashboard

This is a personal project that extends my learning after taking a Udemy course on React Web Development, where i built and uploaded an interactive web-based code editor to NPMJS – [jsbook-jsnote](https://www.npmjs.com/package/jbook-jsnote)

This website has a login page, sign up page, and a dashboard with CRUD operations built using typescript, react hooks, axios and Material UI by fetching data from dummy APIs.

## Notable library usage

- Material UI
- Redux
- React-Hook-Form
- Axios
- Yup schema for input validation
- Notistack for alerts
- React-router-dom
- Redux-persist

## Installation

Install necessary libraries

```plaintext
  npm install
```

## Run

```plaintext
  npm start
```

The project will run on http://localhost:3000

## Log In

Use one of the following to log in to the dashboard.  
Example of first 10 username & password from https://dummyjson.com/users

{id: 1, username: 'emilys', password: 'emilyspass'}  
{id: 2, username: 'michaelw', password: 'michaelwpass'}  
{id: 3, username: 'sophiab', password: 'sophiabpass'}  
{id: 4, username: 'jamesd', password: 'jamesdpass'}  
{id: 5, username: 'emmaj', password: 'emmajpass'}  
{id: 6, username: 'oliviaw', password: 'oliviawpass'}  
{id: 7, username: 'alexanderj', password: 'alexanderjpass'}  
{id: 8, username: 'avat', password: 'avatpass'}  
{id: 9, username: 'ethanm', password: 'ethanmpass'}  
{id: 10, username: 'isabellad', password: 'isabelladpass'}

## Dashboard

Fetches 55 posts from https://jsonplaceholder.typicode.com/posts and displays them in a table with pagination.

In the **Users CRUD** page, CRUD operations can be performed on table rows with appropriate HTTP request methods.
