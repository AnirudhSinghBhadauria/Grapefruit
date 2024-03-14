class apiError extends Error {
  statusCode: number;
  error: any;
  success = false

  constructor(statusCode: number, error: any) {
    super();
    this.statusCode = statusCode;
    this.error = error;
    this.success = false
  }
}

export { apiError };
