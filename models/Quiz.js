var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var quizSchema = new Schema({
  name: String,
  desc: String,
  questions: [Schema.Types.ObjectId],
  author: String,
  tags: [Schema.Types.ObjectId],
  created_at: { type: Date, default: Date.now },
  last_updated:  { type: Date, default: Date.now }
});

quizSchema.statics.getQuizes = function(limit, callback){
  var quizes = [];
  this.find({}, 'name desc questions author created_at', {limit: limit}).exec(function(err, res){
    if(!err){
      quizes = res;
    }

    callback(quizes);
  });
};

quizSchema.statics.getQuiz = function(id, callback){
  var quiz = {};
  this.findById(id).exec(function(err, res){
    if(!err){
      quiz = res;
    }
    callback(quiz);
  });
}

module.exports = Quiz = mongoose.model('Quiz', quizSchema);
