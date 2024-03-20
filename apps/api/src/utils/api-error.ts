class apiError {
  statusCode: number;
  error: any;
  success: boolean;
  message: string;

  constructor(statusCode: number, error: any, message: string) {
    this.statusCode = statusCode;
    this.error = error;
    this.success = false;
    this.message = message;
  }
}

export { apiError };
