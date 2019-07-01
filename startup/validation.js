const Joi = require("joi");

function validation() {
  Joi.objectid = require("joi-objectid")(Joi);
}

module.exports = validation;
