const Login = (userMicroservice) => {
  const operations = { POST };
  function POST(req, res, next) {
    res.json({ message: "hello there" });
  }
  POST.apiDoc = {
    tags: ["user"],
    description: "Login a user",
    summary: "Login a user",
    operationId: "userLogin",
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
            email: { type: "string", format: "email" },
            password: { type: "string", format: "password" },
          },
          required: ["email", "password"],
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
        headers: {
          token: {
            type: "string",
            description: "User token",
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
module.exports = Login;
