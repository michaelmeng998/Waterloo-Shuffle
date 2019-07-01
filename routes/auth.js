const Joi = require("joi");
const bycrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//callback function is the 'route' handler
router.post("/", async (req, res) => {
  const { error } = validate(req.body); // result.error, this is object destructuring
  if (error) {
    //400 BAD Request
    return res.status(400).send(result.error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    //bad request, not 404 dont want to tell information on whats incorrect
    return res.status(400).send("Invalid email or password");
  }

  //user.password has salt, bcrypt will add salt to input
  const validPassword = await bycrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid email or password");
  }

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(req, schema);
}

module.exports = router;
