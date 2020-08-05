const Ping = () => {
  const operations = { GET };
  function GET(req, res, next) {
    res.json({ message: "Logged" });
  }
  GET.apiDoc = {
    tags: ["user"],
    description: "Verify if token available",
    summary: "Verify if token available",
    operationId: "userPing",
    produces: ["application/json"],
    security: [{ JWTAuth: [] }],
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
module.exports = Ping;
