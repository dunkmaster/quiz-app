var express = require('express'),
  http = require('http'),
  mongoose = require('mongoose'),
  exphbs = require('express-handlebars'),
  routes = require('./routes');
  

var app = express();
var port = process.env.PORT || 8080;

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

mongoose.connect('mongodb://localhost/quiz-app');

app.get('/', routes.index);

app.get('/quiz/:id', routes.quiz);
app.get('/questions', routes.questions);

app.use('/', express.static(__dirname + "/public/"));

var server = http.createServer(app).listen(port, function(){
  console.log("Started express server on port: " + port);
});
