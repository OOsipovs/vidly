const debug  =require('debug')('app:startup');
const config = require('config');
const Joi = require('joi');
const express = require('express');
const logger = require('./middleware/logger');
const morgan = require('morgan');
const genres = require('./routes/genres');
const home = require('./routes/home');

const app = express();

if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
  debug('Morgan enabled...');
}

//app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);

app.use('/api/genres', home);
app.use('/', home)
const port = process.env.PORT || 3002 ;

app.listen(port, () =>{
  console.log('Listening on port' + port);
})