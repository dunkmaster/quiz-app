var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var catSchema = new Schema({
  name:  String,
  desc: String,
  date: { type: Date, default: Date.now },
});

catSchema.statics.getCategories = function(limit, callback){
  var cats = [];
  this.find({}, 'name desc date', {limit: limit}).exec(function(err, res){
    if(!err){
      cats = res;
    }

    callback(cats);
  });
};

catScema.methods.getCategoryByName = function(name, callback){
  var cat = {};
  this.find({name: name}).exec(function(err, res){
    if(!err){
      cat = res;
    }
  });
  callback(cat);
}



module.exports = Category = mongoose.model('Category', catSchema);
