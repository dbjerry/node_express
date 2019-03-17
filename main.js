var express = require('express');
var app = express();
var fs = require('fs');
var compression = require('compression');
var bodyParser = require('body-parser');
var helmet = require('helmet');
app.use(helmet());

var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
// app.use(function(request, response, next) {
app.get('*', function(request, response, next) {
  //글 목록을 표현해줌
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  });
});

app.use('/', indexRouter);
app.use('/topic', topicRouter);

app.use(function(request, response, next) {
  response.status(404).send('Sorry cant find that!');
});

app.use(function(err, request, response, next) {
  console.error(err.stack);
  response.status(500).send('Something broke!');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});
