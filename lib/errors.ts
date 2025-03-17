export class ServerActionError extends Error {
  status: number;
  constructor(data: { message: string; status: number }) {
    super(data.message);
    this.status = data.status;
    Object.setPrototypeOf(this, ServerActionError.prototype); // Fixes prototype chain issues in TypeScript
  }
}
