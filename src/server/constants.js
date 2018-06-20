export const HTTP_ERROR_400 = {
  statusCode: 400,
  error: 'Sorry, Bad Client Request'
};

export const HTTP_ERROR_500 = {
  statusCode: 500,
  error: 'Sorry, Server Error'
};

export const createError = (error, statusCode = 400) => ({
  statusCode,
  error
});

export const createSuccess = (message, statusCode) => ({
  statusCode,
  message
});
