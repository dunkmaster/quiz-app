var React = require('react/addons');

module.exports = Question = React.createClass({

  timer: null,
  answer: function(index, id){

    var end = window.performance.now();
    var timeTaken = end - this.props.startTime;
    this.getDOMNode().style.pointerEvents = 'none';
    clearInterval(this.timer);
    this.props.onQuestionAnswer(index, id, timeTaken);

  },
  countDown: function(){
    var count = 10;
    var that = this;
    this.timer = setInterval(function(){
      if(count > 0)
        count--;
      else {
        that.answer(-1,that.props.data._id);
        //clearInterval(timer);

      }
      document.getElementById("timer").innerHTML = count;
    }, 1000);


  },
  componentDidMount: function() {
    clearInterval(this.timer);
    this.countDown();
    
  },
  componentDidUpdate: function(){
    clearInterval(this.timer);
    this.countDown();
  },
  render: function(){
    var that = this;
    //options
    var optionNodes = this.props.data.q_options.map(function(option, index){
      return (
        <button onClick={that.answer.bind(null, index, that.props.data._id)} className="option btn-q-opt btn" id={"option-"+index} key={index}>{option}</button>
      );
    });

    return (
      <div className="question-container" id={this.props.data._id} key={this.props.data._id}>
        <h2 className="question-title">{this.props.data.text}</h2>
        <h3 className="timer" id="timer">10</h3>
        <span className="response" id={"response"}></span>
        <div className="options" id="options">
          {optionNodes}
        </div>
      </div>
    );
  }
});
