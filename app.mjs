import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import nunjucks from 'nunjucks';
import { connect } from 'mongoose';
// import './src/application/main.mjs';

import indexRouter from './routes/index.mjs';
import walletRouter from './routes/wallet.route.mjs';

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

await connect(process.env.MONGODB__URI, {
  dbName: process.env.MONGODB__DB,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Error connecting to MongoDB', err);
});

// view engine setup
app.set('views', path.resolve('views'));
app.set('view engine', 'njk');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve('public')));

app.use('/', indexRouter);
app.use('/wallets', walletRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
