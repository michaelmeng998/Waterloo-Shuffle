const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validate } = require("../models/genre");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//callback function is the 'route' handler
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/", auth, async (req, res) => {
  //input validation
  //use validation function
  const { error } = validate(req.body); // result.error, this is object destructuring

  if (error) {
    //400 BAD Request
    return res.status(400).send(error.details[0].message);
  }

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
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

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) {
    return res.status(404).send("the genre with given id not found");
  }
  //return updated course to client
  res.send(genre);
});

//now write app delete

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  //look up genre id
  const genre = await Genre.findByIdAndRemove(req.params.id);
  //not exist, return 404
  if (!genre) {
    res.status(404).send("The genre with the given ID was not found :(."); // return 404
    return;
  }
  //return the same course
  res.send(genre);
});

// /api/genres/1
//use route parameters for required
//use query string params, ?, for optional things like sorting
router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  //writing query logic
  if (!genre) {
    return res
      .status(404)
      .send("The genre with the given ID was not found :(."); // return 404
  }
  res.send(genre);
});

module.exports = router;
