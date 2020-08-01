const Deposit = (userMicroservice) => {
  const operations = { PUT };
  function PUT(req, res, next) {
    const { amount, currency } = req.body;
    const { token } = req.cookies;
    userMicroservice
      .deposit(token, currency, amount)
      .then(() => {
        res.json({ message: `Success deposit ${amount} ${currency}` });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: err.details });
      });
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
module.exports = Deposit;
