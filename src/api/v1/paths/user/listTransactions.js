const ListTransactions = (userMicroservice) => {
  const operations = { GET };
  function GET(req, res, next) {
    const { srcCurrency, destCurrency, startDate, endDate } = req.query;
    const { token } = req.cookies;
    queries = [
      {
        srcCurrency: srcCurrency,
        destCurrency: destCurrency,
        startDate: startDate,
        endDate: endDate,
      },
    ];
    userMicroservice
      .listTransactions(token, queries)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.status(400).json({ message: err.details }));
  }
  GET.apiDoc = {
    tags: ["user"],
    description: "Get user transactions. Optional: based on a filter object",
    summary: "Get user transactions. Optional: based on a filter object",
    operationId: "userListTransactions",
    produces: ["application/json"],
    security: [{ JWTAuth: [] }],
    parameters: [
      { in: "query", name: "srcCurrency", type: "string" },
      { in: "query", name: "destCurrency", type: "string" },
      { in: "query", name: "startDate", type: "string", format: "date-time" },
      { in: "query", name: "endDate", type: "string", format: "date-time" },
    ],
    responses: {
      200: {
        description: "Successful operation",
        schema: {
          type: "object",
          properties: {
            transactions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  srcCurrency: { type: "string" },
                  destCurrency: { type: "string" },
                  date: { type: "string", format: "date-time" },
                  amount: { type: "number" },
                  rate: { type: "number" },
                },
              },
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
module.exports = ListTransactions;
