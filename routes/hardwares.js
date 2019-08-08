const { Hardware, validate } = require("../models/hardware");
const { Type } = require("../models/type");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const hardware = await Hardware.find().sort("name");
  res.send(hardware);
});

router.post("/", async (req, res) => {
  //validating if all required is there
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if type is acceptable
  const type = await Type.findById(req.body.typeId);
  if (!type) return res.status(400).send("Invalid type.");

  //new collection, using relationships
  const hardware = new Hardware({
    name: req.body.name,
    type: {
      _id: type._id,
      name: type.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  await hardware.save();

  res.send(hardware);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const type = await Type.findById(req.body.typeId);
  if (!type) return res.status(400).send("Invalid type.");

  //find item by ID, and update it
  const hardware = await Hardware.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      type: {
        _id: type._id,
        name: type.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    },
    { new: true }
  );

  if (!hardware) {
    return res.status(404).send("The item with the given ID was not found.");
  }
  res.send(hardware);
});

router.delete("/:id", async (req, res) => {
  const hardware = await Hardware.findByIdAndRemove(req.params.id);

  if (!hardware)
    return res.status(404).send("The item with the given ID was not found.");

  res.send(hardware);
});

router.get("/:id", async (req, res) => {
  const hardware = await Hardware.findById(req.params.id);

  if (!hardware)
    return res.status(404).send("The item with the given ID was not found.");

  res.send(hardware);
});

module.exports = router;
