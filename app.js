var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var arcticlesRouter = require('./routes/articles')
var commentsRouter = require('./routes/comments')
var tagsRouter = require('./routes/tags')
const { response } = require('express');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', arcticlesRouter)
app.use('/tags', tagsRouter)
app.use('/comments', commentsRouter)
module.exports = app;
