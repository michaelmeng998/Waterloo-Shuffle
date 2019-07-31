const Joi = require("joi");
const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  }
});

const Type = mongoose.model("Type", typeSchema);

function validateType(type) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required()
  };
  return Joi.validate(type, schema);
}

module.exports.typeSchema = typeSchema;
module.exports.Type = Type;
module.exports.validate = validateType;
