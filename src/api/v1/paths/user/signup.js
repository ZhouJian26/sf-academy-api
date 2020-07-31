const Signup = (userMicroservice) => {
  const operations = { POST };
  function POST(req, res, next) {
    const { email, password, iban, username } = req.body;
    userMicroservice
      .signup(email, password, username, iban)
      .then((data) => {
        res.cookie("token", data.token, {
          maxAge: 60 * 60 * 24 * 365,
          httpOnly: true,
        });
        res.json({ message: "Success signup and logged" });
      })
      .catch((err) => res.status(400).json({ message: err.details }));
  }
  POST.apiDoc = {
    tags: ["user"],
    description: "Singup a new user",
    summary: "Singup a new user",
    operationId: "userSignup",
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
            username: { type: "string" },
            iban: { type: "string" },
          },
          required: ["email", "password", "username", "iban"],
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
module.exports = Signup;
