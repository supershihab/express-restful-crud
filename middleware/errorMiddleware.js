'use strict';

const errorMiddleware = (err, req, res, next) => {
  console.log(`Welcome from Error Middleware.`);
  //if you get statusCode, show it, else show 500
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({message: err.message, stack:process.env.NODE_ENV === 'development' ? err.stack : null});
}

module.exports = errorMiddleware;