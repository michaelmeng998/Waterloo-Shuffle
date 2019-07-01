const winston = require("winston");

function error(err, req, res, next) {
  //winston first argument is message, second is metadata
  winston.error(err.message, err);
  //error
  //warn
  //info
  //verbose
  //debug
  //silly

  //only sends errors that handled during request processing pipeline
  res.status(500).send("Something failed");
}

module.exports = error;
