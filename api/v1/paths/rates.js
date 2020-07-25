"use strict";
const Rates = (exchangeMicroservice) => {
  const operations = { GET };
  async function GET(req, res, next) {
    const rates = await exchangeMicroservice.getRates();
    res.status(200).json(rates);
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
