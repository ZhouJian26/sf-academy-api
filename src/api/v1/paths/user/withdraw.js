const Withdraw = (userMicroservice) => {
  const operations = { PUT };
  function PUT(req, res, next) {
    res.json({ message: "hello there" });
  }
  PUT.apiDoc = {
    tags: ["user"],
    description:
      "Withdraw an amount of a target currency from the virtual portfolio",
    summary:
      "Withdraw an amount of a target currency from the virtual portfolio",
    operationId: "userWithdraw",
    consumes: ["application/json"],
    produces: ["application/json"],
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
module.exports = Withdraw;
