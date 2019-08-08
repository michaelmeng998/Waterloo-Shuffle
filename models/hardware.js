const Joi = require("joi");
const mongoose = require("mongoose");
const { typeSchema } = require("./type");

const Hardware = mongoose.model(
  "Hardware",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minglength: 5,
      maxlength: 255
    },
    type: {
      type: typeSchema,
      required: true
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255
    }
  })
);

function validateHardware(hardware) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    typeId: Joi.objectid().required(),
    numberInStock: Joi.number()
      .min(0)
      .required(),
    dailyRentalRate: Joi.number()
      .min(0)
      .required()
  };

  return Joi.validate(hardware, schema);
}

exports.Hardware = Hardware;
exports.validate = validateHardware;
