"use strict";
const Rates = (exchangeMicroservice) => {
  const operations = { GET };
  function GET(req, res, next) {
    exchangeMicroservice
      .getRates()
      .then((data) => res.status(200).json(data))
      .catch((err) => {
        res.status(400).json({ message: err.details });
      });
  }
  GET.apiDoc = {
    tags: ["exchange"],
    description: "Get current currency rates",
    summary: "Get current currency rates",
    operationId: "getExchangeRates",
    produces: ["application/json"],
    responses: {
      200: {
        description: "Successful operation",
        schema: {
          type: "object",
          additionalProperties: {
            type: "number",
            description: "currency rate",
          },
        },
      },
      default: {
        description: "An error occurred",
        schema: {
          $ref: "#definitions/Error",
        },
      },
    },
  };
  return operations;
};
module.exports = Rates;
