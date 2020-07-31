const Deposit = (userMicroservice) => {
  const operations = { PUT };
  function PUT(req, res, next) {
    res.json({ message: "hello there" });
  }
  PUT.apiDoc = {
    tags: ["user"],
    description:
      "Deposit an amount of a target currency into the virtual portfolio",
    summary:
      "Deposit an amount of a target currency into the virtual portfolio",
    operationId: "userDeposit",
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
              minimum: 0,
              multipleOf: 0.01,
            },
            currency: { type: "string" },
          },
          required: ["amount", "currency"],
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
module.exports = Deposit;
