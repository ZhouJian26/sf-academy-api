const ListTransactions = (userMicroservice) => {
  const operations = { GET };
  function GET(req, res, next) {
    res.json({ message: "hello there" });
  }
  GET.apiDoc = {
    tags: ["user"],
    description: "Get user transactions. Optional: based on a filter object",
    summary: "Get user transactions. Optional: based on a filter object",
    operationId: "userListTransactions",
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
            queries: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  srcCurrency: { type: "string" },
                  destCurrency: { type: "string" },
                  startDate: { type: "string", format: "date-time" },
                  endDate: { type: "string", format: "date-time" },
                },
              },
            },
          },
          required: ["queries"],
        },
      },
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
