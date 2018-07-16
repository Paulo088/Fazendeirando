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

let produts = mongoose.Schema({
    name: String,
    price: Number,
    category: Boolean
});

let company = mongoose.Schema({
    name: String,
    test: String
});

let user = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    money: Number,
    level: Number,
    companies: []
});

let Resource = app.resource = restful.model('produtos', produts)
  .methods(['get', 'post', 'put', 'delete']);

Resource.register(app, '/produtos');

Resource = app.resource = restful.model('users', user)
  .methods(['get', 'post', 'put', 'delete']);

Resource.register(app, '/users');

Resource = app.resource = restful.model('companies', company)
  .methods(['get', 'post', 'put', 'delete']);

Resource.register(app, '/companies');

app.listen(3000);