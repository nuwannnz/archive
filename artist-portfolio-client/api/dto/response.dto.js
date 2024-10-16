class ResponseDto {
    constructor(statusCode, body, headers, isErrorResponse = false) {
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
  
  module.exports = ResponseDto;
  