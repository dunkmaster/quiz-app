var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
  name: String,
  desc: String,
  created_at: {type: Date, default: Date.now}
});

module.exports = Tag = mongoose.model('tags', tagSchema);
