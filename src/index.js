"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { initialize } = require("express-openapi");
const { join } = require("path");

require("dotenv").config();

const exchangeMicroservice = require("./services/exchange");
const userMicroservice = require("./services/user");

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
  apiDoc: join(__dirname, "./api/v1/api-doc.yml"),
  securityHandlers: securityHandlers,
  dependencies: {
    log: console.log,
    exchangeMicroservice: new exchangeMicroservice(process.env.EXCHANGE_URL),
    userMicroservice: new userMicroservice(process.env.USER_URL),
  },
  paths: __dirname + "/api/v1/paths",
});

app.listen(3000, () => {
  console.log("api listening on port 3000");
});
