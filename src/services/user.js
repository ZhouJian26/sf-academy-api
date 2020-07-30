const PROTO_PATH = __dirname + "/../../../sf-academy-proto/src/user.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const exchangePackageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const user_proto = grpc.loadPackageDefinition(exchangePackageDefinition).user;

function UserMicroservice(url) {
  this.url = url;
}
UserMicroservice.prototype.getClientGRPC = function getClientGRPC() {
  return new user_proto.User(this.url, grpc.credentials.createInsecure());
};
UserMicroservice.prototype.signup = function signup(
  email,
  password,
  username,
  iban
) {
  return new Promise((res, rej) => {
    this.getClientGRPC().signup(
      {
        email: email,
        password: password,
        username: username,
        iban: iban,
      },
      (err, response) => {
        if (err) return rej(err);
        res(response);
      }
    );
  });
};
UserMicroservice.prototype.login = function login(email, password) {
  return new Promise((res, rej) => {
    this.getClientGRPC().login(
      {
        email: email,
        password: password,
      },
      (err, response) => {
        if (err) return rej(err);
        res(response);
      }
    );
  });
};

UserMicroservice.prototype.deposit = function deposit(token, currency, amount) {
  return new Promise((res, rej) => {
    const metadata = new grpc.Metadata();
    metadata.add("token", token);
    this.getClientGRPC().deposit(
      {
        amount: amount,
        currency: currency,
      },
      metadata,
      (err, response) => {
        if (err) return rej(err);
        res(response);
      }
    );
  });
};
UserMicroservice.prototype.withdraw = function withdraw(
  token,
  currency,
  amount
) {
  return new Promise((res, rej) => {
    const metadata = new grpc.Metadata();
    metadata.add("token", token);
    this.getClientGRPC().withdraw(
      {
        amount: amount,
        currency: currency,
      },
      metadata,
      (err, response) => {
        if (err) return rej(err);
        res(response);
      }
    );
  });
};
UserMicroservice.prototype.buy = function buy(
  token,
  srcCurrency,
  destCurrency,
  amount
) {
  return new Promise((res, rej) => {
    const metadata = new grpc.Metadata();
    metadata.add("token", token);
    this.getClientGRPC().buy(
      {
        amount: amount,
        srcCurrency: srcCurrency,
        destCurrency: destCurrency,
      },
      metadata,
      (err, response) => {
        if (err) return rej(err);
        res(response);
      }
    );
  });
};
UserMicroservice.prototype.listTransactions = function listTransactions(
  token,
  queries
) {
  return new Promise((res, rej) => {
    const metadata = new grpc.Metadata();
    metadata.add("token", token);
    this.getClientGRPC().listTransactions(
      {
        queries: queries,
      },
      metadata,
      (err, response) => {
        if (err) return rej(err);
        res(response);
      }
    );
  });
};

module.exports = UserMicroservice;
