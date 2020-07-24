"use strict";

const EXCHANGE_PROTO_PATH =
  __dirname + "/../sf-academy-proto/src/exchange.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const express = require("express");
const bodyParser = require("body-parser");
const { initialize } = require("express-openapi");
const { join } = require("path");
const exchangePackageDefinition = protoLoader.loadSync(EXCHANGE_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const exchange_proto = grpc.loadPackageDefinition(exchangePackageDefinition)
  .exchange;

const operations = {
  getExchangeRates: (req, res, next) => {
    const exchangeMicroservice = new exchange_proto.Exchange(
      "exchange_microservice:9000",
      grpc.credentials.createInsecure()
    );
    exchangeMicroservice.rates({}, (err, response) => {
      res.json(response.rates);
    });
  },
};

const app = express();
app.use(bodyParser.json());

initialize({
  app,
  errorMiddleware: (err, req, res, next) => {
    // only handles errors for /v3/*
    res.json(err);
  },
  apiDoc: join(__dirname, "../docs/openapi.yaml"),
  dependencies: {
    log: console.log,
  },
  operations,
});

app.listen(3000, () => {
  console.log("api listening on port 3000");
});
