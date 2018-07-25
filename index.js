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
    level: Number
});

let loan = mongoose.Schema({
    value: Number,
    limit: Date,
    interestRate: Number
});

let user = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    money: Number,
    level: Number,
    exp: Number,
    produts: [produts],
    companies: [company],
    loans: [loan]
});

let Produts = app.resource = restful.model('produts', produts)
    .methods(['get', 'post', 'put', 'delete']);

Produts.register(app, '/produtos');

let Companies = app.resource = restful.model('companies', company)
    .methods(['get', 'post', 'put', 'delete']);

Companies.register(app, '/companies');

let Loans = app.resource = restful.model('loans', loan)
    .methods(['get', 'post', 'put', 'delete']);

Loans.register(app, '/loans');

let Users = app.resource = restful.model('users', user)
    .methods(['get', 'post', 'put', 'delete']);

Users.register(app, '/users');

app.listen(3000);