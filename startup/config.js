const config = require("config");

function Config() {
  if (!config.get("jwtPrivateKey")) {
    //throwing exception, current infrastructure will catch and log it
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
  }
}

module.exports = Config;
