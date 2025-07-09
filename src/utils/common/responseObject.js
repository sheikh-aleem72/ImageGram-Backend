export const internalServerError = (error) => {
  return {
    success: false,
    err: error,
    data: {},
    message: 'Some internal server error'
  };
};

export const errorResponse = (error) => {
  if (!error.message && !error.explanation) {
    return internalServerError(error);
  }

  return {
    success: false,
    err: error,
    data: {},
    message: error.message
  };
};

export const successResponse = (data, message) => {
  return {
    success: true,
    data,
    message
  };
};
