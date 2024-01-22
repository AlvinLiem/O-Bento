function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let message = `Internal Server Error`;

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      statusCode = 400;
      message = err.errors[0].message;
      break;

    case "EmailIsRequired":
      statusCode = 400;
      message = `Email is required`;
      break;

    case "PasswordIsRequired":
      statusCode = 400;
      message = `Password is required`;
      break;

    case "EmailIsInvalid":
    case "PasswordIsInvalid":
      statusCode = 401;
      message = `Email or Password is invalid`;
      break;

    case "Error Not Found":
      statusCode = 404;
      message = `Data Not Found`;
      break;

    case "Forbidden Access":
      statusCode = 403;
      message = `Forbidden Access`;
      break;

    case "Invalid Token":
      statusCode = 401;
      message = `Invalid Token`;
      break;

    case "JsonWebTokenError":
      statusCode = 401;
      message = `Invalid Token`;
      break;

    case "Image is required":
      statusCode = 400;
      message = `Image is required`;
      break;

    default:
      break;
  }

  res.status(statusCode).json({ message: message });
}

module.exports = { errorHandler };
