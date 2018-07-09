const express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

mongoose.connect("mongodb://localhost/db_fazendeirando");

let Resource = app.resource = restful.model('produtos', mongoose.Schema({
    title: String
  }))
  .methods(['get', 'post', 'put', 'delete']);

Resource.register(app, '/produtos');

app.listen(3000);