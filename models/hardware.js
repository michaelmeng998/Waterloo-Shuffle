const Joi = require("joi");
const mongoose = require("mongoose");
const { TypeSchema } = require("./type");

const Hardware = mongoose.model(
  "Hardware",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minglength: 5,
      maxlength: 255
    },
    type: {
      type: TypeSchema,
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
    title: Joi.string()
      .min(5)
      .max(50)
      .required(),
    genreId: Joi.objectid().required(),
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
