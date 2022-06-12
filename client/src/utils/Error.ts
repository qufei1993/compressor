export class CancelReqError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'CancelReqError';
    Object.setPrototypeOf(this, CancelReqError.prototype);
  }
}
