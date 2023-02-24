const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500
};

const successResponse = (data, statusCode = 200) => {
    return {
      success: true,
      statusCode,
      data
    }
  }
  
  const errorResponse = (error, statusCode = 200) => {
    return {
      success: false,
      statusCode,
      message: error
    }
  }

  class HttpError {
    constructor(statusCode, description, errorDetails = null) {
      this.status = statusCode;
      this.description = description;
      if (errorDetails) {
        this.details = errorDetails;
      }      
    }
  }
  
  module.exports = {
    successResponse,
    errorResponse,
    HTTP_STATUS,
    HttpError
  }