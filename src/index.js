'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {initialize} = require('express-openapi');
const {join} = require('path');

require('dotenv').config();

const exchangeMicroservice = require('./services/exchange');
const userMicroservice = require('./services/user');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

const securityHandlers = {
  JWTAuth: (req, scopes, definition) => {
    if (req.cookies.token == undefined) return Promise.resolve(false);
    return Promise.resolve(true);
  },
};

initialize({
  app,
  errorMiddleware: (err, req, res, next) => {
    res.json(err);
  },
  apiDoc: join(__dirname, './api/v1/api-doc.yml'),
  securityHandlers: securityHandlers,
  dependencies: {
    exchangeMicroservice:
        new exchangeMicroservice('exchange_microservice:9000'),
    userMicroservice: new userMicroservice('user_microservice:9001'),
  },
  paths: __dirname + '/api/v1/paths',
});

app.listen(3000, () => {
  console.log('api listening on port 3000');
});
