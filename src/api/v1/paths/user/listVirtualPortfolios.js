const ListVirtualPortfolios = (userMicroservice) => {
  const operations = { GET };
  function GET(req, res, next) {
    const { token } = req.headers;
    userMicroservice
      .listVirtualPortfolios(token)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.status(400).json({ message: err.details }));
  }
  GET.apiDoc = {
    tags: ["user"],
    description: "Get user virtual portfolios",
    summary: "Get user virtual portfolios",
    operationId: "userListVirtualPortfolio",
    produces: ["application/json"],
    security: [{ JWTAuth: [] }],
    responses: {
      200: {
        description: "Successful operation",
        schema: {
          type: "object",
          properties: {
            listVirtualPortfolio: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  currency: { type: "string" },
                  balance: { type: "number" },
                  date: { type: "string", format: "date-time" },
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
module.exports = ListVirtualPortfolios;
