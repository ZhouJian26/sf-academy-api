const Buy = (userMicroservice) => {
  const operations = { POST };
  function POST(req, res, next) {
    const { amount, srcCurrency, destCurrency } = req.body;
    const { token } = req.cookies;
    userMicroservice
      .buy(token, srcCurrency, destCurrency, amount)
      .then(() => {
        res.json({
          message: `Success buy ${amount} ${srcCurrency} => ${destCurrency}`,
        });
      })
      .catch((err) => res.status(400).json({ message: err.details }));
  }
  POST.apiDoc = {
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
