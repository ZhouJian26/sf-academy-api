const Buy = (userMicroservice) => {
  const operations = { PUT };
  function PUT(req, res, next) {
    res.json({ message: "hello there" });
  }
  PUT.apiDoc = {
    tags: ["user"],
    description: "Convert an amount of a target currency into another one",
    summary: "Convert an amount of a target currency into another one",
    operationId: "userBuy",
    consumes: ["application/json"],
    produces: ["application/json"],
    security: [{ JWTAuth: [] }],
    parameters: [
      {
        in: "body",
        name: "body",
        required: true,
        schema: {
          type: "object",
          properties: {
            amount: {
              type: "number",
              minimum: 0.01,
              multipleOf: 0.01,
            },
            srcCurrency: { type: "string" },
            destCurrency: { type: "string" },
          },
          required: ["amount", "destCurrency", "srcCurrency"],
        },
      },
    ],
    responses: {
      200: {
        description: "Successful operation",
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
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
module.exports = Buy;
