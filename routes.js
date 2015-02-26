var JSX = require('node-jsx').install(),
  React = require('react/addons'),
  QuizApp = React.createFactory(require('./components/QuizApp')),
  Question = require('./models/Question'),
  Quiz = require('./models/Quiz'),
  Data = require('./data/fake');

module.exports = {
  index: function(req, res){
    var props = {data: Data};
    Quiz.getQuizes(50, function(quizes){
      var reactString = React.renderToString(
        QuizApp({
          data: Data
        })
      );
      res.render('home', {
        quizes: reactString,
        quizProps: JSON.stringify(props)
      });
    });
  },
  quiz: function(req, res){
    Quiz.getQuiz(req.params.id, function(quiz){
      var reactString = React.renderToString(
        QuizApp({
          data: quiz
        })
      );
      res.render('quiz', {
        quiz: quiz
      });
    });
  },
  questions: function(req, res){
    Questions.getQuestions(50, function(questions){
      res.render('questions', {
        questions: questions
      });
    });
  }


}
