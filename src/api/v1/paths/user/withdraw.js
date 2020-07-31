const Withdraw = (userMicroservice) => {
  const operations = { PUT };
  function PUT(req, res, next) {
    const { amount, currency } = req.body;
    const { token } = req.headers;
    userMicroservice
      .withdraw(token, currency, amount)
      .then(() => {
        res.json({ message: `Success withdraw ${amount} ${currency}` });
      })
      .catch((err) => res.status(400).json({ message: err.details }));
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
              minimum: 0.01,
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
