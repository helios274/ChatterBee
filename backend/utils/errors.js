export class ValidationError extends Error {
  constructor(errors) {
    const error = errors.array()[0];
    super();
    this.message = error.msg;
    this.statusCode = 400;
  }
}

export class CustomError extends Error {
  constructor(statusCode, message) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
