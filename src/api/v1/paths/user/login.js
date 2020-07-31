const Login = (userMicroservice) => {
  const operations = { PUT };
  function PUT(req, res, next) {
    const { email, password } = req.body;
    userMicroservice
      .login(email, password)
      .then((data) => {
        res.cookie("token", data.token, {
          maxAge: 60 * 60 * 24 * 365,
          httpOnly: true,
        });
        res.json({ message: "Success login" });
      })
      .catch((err) => res.status(400).json({ message: err.details }));
  }
  PUT.apiDoc = {
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
