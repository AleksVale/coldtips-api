export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.status = 400; // Set the status code to 400 (Bad Request)
  }
}