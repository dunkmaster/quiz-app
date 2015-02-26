var React = require('react/addons');

module.exports = QuizScoreScreen = React.createClass({

  roundScore: function(score){
    return Math.round(score);
  },
  render: function(){
    return (
      <div className="score-screen">
        <h2 className="score-title">{this.props.title}</h2>
        <div className="score-result">
          <h1 className="score">Result: <b>{this.roundScore(this.props.score)}</b></h1>
        </div>

        <div className="action-bar bottom">
          <button className="btn" id="repeat-button">Again?</button>
          <button className="btn" id="home-button">Go Back to list</button>
        </div>
      </div>
    );
  }
});
