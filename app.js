/** @jsx React.DOM */

var React = require('react/addons');
var QuizApp = React.createFactory(require('./components/QuizApp'));

// Snag the initial state that was passed from the server side
var initialState = JSON.parse(document.getElementById('props').innerHTML);
// Render the components, picking up where react left off on the server
console.log(initialState)
React.render(
  QuizApp(initialState),
  document.getElementById('react-app')
);
