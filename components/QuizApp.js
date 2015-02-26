var React = require('react/addons');
var Question = require('./Question');
var QuizScoreScreen = require('./QuizScoreScreen');



module.exports = QuizApp = React.createClass({
  // Render the component
  getInitialState: function(){
    return {
      score: 0.0,
      currentQuestion: 0,
      showFinalScore: false,
      startTime: 0
    };
  },
  calculateScore: function(time){
    var fullScore = 1000;
    var timeInSeconds = time / 1000.00;
    var finalScore = (fullScore - (timeInSeconds * 100)) + this.state.score;
    this.setState({score: finalScore});
  },
  answer: function(aIndex, qId, time){

    var currentQIndex = this.state.currentQuestion;
    var currentQuestion = this.props.data[qId];
    if(aIndex >= 0)
      var answerNode = document.getElementById("option-"+aIndex);

    if(aIndex === currentQuestion.answer){
      this.calculateScore(time);
      answerNode.classList.toggle("btn-correct");
    } else if(aIndex >= 0){
      answerNode.classList.toggle("btn-wrong");
      var correctAnswerNode = document.getElementById("option-"+currentQuestion.answer);
      correctAnswerNode.classList.toggle("btn-show-correct");
    } else {
      var correctAnswerNode = document.getElementById("option-"+currentQuestion.answer);
      correctAnswerNode.classList.toggle("btn-show-correct");
    }
    var nextQuestion = currentQIndex + 1;

    if(nextQuestion >= this.props.data.length){
      //document.getElementById("options").style.display = 'none';
      document.getElementById("next-container").style.display = 'block';
      document.getElementById("next-button").innerHTML = "Show score";
    } else{
      //document.getElementById("options").style.display = 'none';
      document.getElementById("next-container").style.display = 'block';
    }
  },
  next: function(){
    document.getElementById("response").style.display = "none";
    var nextQuestion = this.state.currentQuestion + 1;
    if(nextQuestion == this.props.data.length){
      this.setState({showFinalScore: true});
    } else {
      var start = window.performance.now();
      this.setState({startTime: start});
      this.setState({currentQuestion: nextQuestion});

    }
    console.log("Id in state: " + this.state.currentQuestion + "Id in next: " + nextQuestion);
    document.getElementById("options").style.display = 'block';
    document.getElementById("next-container").style.display = 'none';


  },
  render: function(){

    var that = this;
    console.log("Id in state: " + this.state.currentQuestion);
    var currentQuestion = this.props.data[this.state.currentQuestion];
    console.log("currentQuestion: " + currentQuestion._id);
    var showComponent;
    var nextButton;
    if(this.state.showFinalScore){
      showComponent = <QuizScoreScreen score={this.state.score} title={"Resultat!"} />;
    } else {
      showComponent = <Question startTime={this.state.startTime} data={currentQuestion} onQuestionAnswer={this.answer}/>;
      nextButton = <div className="actionbar" id="next-container"><button onClick={that.next} id="next-button" className="btn">Next</button></div>;
    }
    return (
      <div className="app-container">
        {showComponent}
        {nextButton}
      </div>
    );


  }
});
