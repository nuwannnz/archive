export class ResponseDto {
  statusCode: number;
  body: string;
  headers: object;

  constructor(
    statusCode: number,
    body: unknown,
    headers: object,
    isErrorResponse = false,
  ) {
    this.statusCode = statusCode;
    this.body = isErrorResponse
      ? JSON.stringify({
          status: 'Failed',
          message: body,
        })
      : JSON.stringify(body);
    this.headers = headers;
  }
}
