"use strict";
const Exchange = (exchangeMicroservice) => {
  const operations = { GET };
  function GET(req, res, next) {
    const { value, from, to } = req.query;
    exchangeMicroservice
      .getExchange(value, from, to)
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(400).json({ message: err.details }));
  }
  GET.apiDoc = {
    tags: ["exchange"],
    description: "Exchange the sum of money in another currency",
    summary: "Exchange the sum of money in another currency",
    operationId: "getExchange",
    produces: ["application/json"],
    parameters: [
      {
        in: "query",
        name: "value",
        required: true,
        type: "number",
      },
      {
        in: "query",
        name: "from",
        required: true,
        type: "string",
      },
      {
        in: "query",
        name: "to",
        required: true,
        type: "string",
      },
    ],
    responses: {
      200: {
        description: "Successful operation",
        schema: {
          type: "object",
          properties: {
            value: {
              type: "number",
              description: "Converted value",
            },
          },
          required: ["value"],
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
module.exports = Exchange;
