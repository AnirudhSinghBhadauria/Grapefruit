class apiResponse {
  statusCode: number;
  message: string;
  data: any;
  success: true;

  constructor(
    statusCode: number,
    data: any,
    message: string,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = true;
  }
}

export { apiResponse };
