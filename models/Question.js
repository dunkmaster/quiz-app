var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  text: String,
  desc: String,
  q_options: [String],
  _typeId: Schema.Types.ObjectId,
  tags: [Schema.Types.ObjectId],
  answer: {type: Number, default: 0},
  created_at: { type: Date, default: Date.now },
  last_updated:  { type: Date, default: Date.now }
});

questionSchema.statics.getQuestions = function(limit, callback){
  var question = [];
  this.find({}, 'text desc options _typeId tags', {limit: limit}).exec(function(err, res){
    if(!err){
      questions = res;
    }

    callback(question);
  });
};

questionSchema.statics.getQuestionById = function(id, callback){
  var question = {};
  this.findOne({_id: id}, 'text desc options _typeId tags created_at last_updated').exec(function(err, res){
    if(!err){
      question = res;
    }
    callback(question);
  });
}

questionSchema.statics.getAnswer = function(id, callback){
  var answer = -1;
  this.findOne({_id: id}, 'answer', function(err, res){
    if(!err){
      answer = res.answer;
    }
    callback(answer);
  });

}

module.exports = Question = mongoose.model('Question', questionSchema);
