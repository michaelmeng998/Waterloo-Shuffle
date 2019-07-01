const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const bycrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/:me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

//callback function is the 'route' handler
router.post("/", async (req, res) => {
  const { error } = validate(req.body); // result.error, this is object destructuring
  if (error) {
    //400 BAD Request
    return res.status(400).send(result.error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already registered.");
  }
  //reset user
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bycrypt.genSalt(10);
  //hashing password and setting it to original
  user.password = await bycrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  //get new obejct with name and email and send
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
