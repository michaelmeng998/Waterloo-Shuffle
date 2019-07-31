const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Type, validate } = require("../models/type");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//callback function is the 'route' handler
router.get("/", async (req, res) => {
  const types = await Type.find().sort("name");
  res.send(types);
});

router.post("/", auth, async (req, res) => {
  //input validation
  //use validation function
  const { error } = validate(req.body); // result.error, this is object destructuring

  if (error) {
    //400 BAD Request
    return res.status(400).send(error.details[0].message);
  }

  let type = new Type({ name: req.body.name });
  type = await type.save();
  res.send(type);
});

//next add put response
router.put("/:id", [auth, validateObjectId], async (req, res) => {
  //validate
  //if invalid, return 400 - bad request
  //input validation
  const { error } = validate(req.body); // result.error, this is object destructuring

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const type = await Type.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!type) {
    return res.status(404).send("the type with given id not found");
  }
  //return updated course to client
  res.send(type);
});

//now write app delete

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  //look up genre id
  const type = await Type.findByIdAndRemove(req.params.id);
  //not exist, return 404
  if (!type) {
    res.status(404).send("The type with the given ID was not found :(."); // return 404
    return;
  }
  //return the same course
  res.send(type);
});

// /api/genres/1
//use route parameters for required
//use query string params, ?, for optional things like sorting
router.get("/:id", validateObjectId, async (req, res) => {
  const type = await Type.findById(req.params.id);
  //writing query logic
  if (!type) {
    return res.status(404).send("The type with the given ID was not found :(."); // return 404
  }
  res.send(type);
});

module.exports = router;
