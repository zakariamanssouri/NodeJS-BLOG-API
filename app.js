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
const { login } = require('./routes/login')
const { verify } = require('./middlewares/verify')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/dashbord', verify, async function (req, res, next) {
    res.sendFile(path.join(__dirname, './public/welcome.html'));
})


app.use('/', indexRouter);
app.use('/login', login)
app.use('/users', usersRouter);
app.use('/articles', arcticlesRouter)
app.use('/tags', tagsRouter)
app.use('/comments', commentsRouter)
module.exports = app;
