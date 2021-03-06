const Logout = () => {
  const operations = {GET};
  function GET(req, res, next) {
    res.clearCookie('token');
    res.json({message: 'Logout'});
  }
  GET.apiDoc = {
    tags: ['user'],
    description: 'Logout a user',
    summary: 'Logout a user',
    operationId: 'userLogout',
    produces: ['application/json'],
    responses: {
      200: {
        description: 'Successful operation',
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
          },
        },
      },
      default: {
        description: 'An error occurred',
        schema: {
          $ref: '#definitions/Error',
        },
      },
    },
  };
  return operations;
};
module.exports = Logout;
