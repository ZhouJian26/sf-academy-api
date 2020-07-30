"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const { initialize } = require("express-openapi");
const { join } = require("path");

require("dotenv").config();

const exchangeMicroservice = require("./services/exchange");
const userMicroservice = require("./services/user");

const app = express();
app.use(bodyParser.json());

initialize({
  app,
  errorMiddleware: (err, req, res, next) => {
    // only handles errors for /v3/*
    res.json(err);
  },
  apiDoc: join(__dirname, "./api/v1/api-doc.yml"),
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
