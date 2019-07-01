// const customer = require("../models/customer"); -> harder to read code
const { Customer, validate } = require("../models/customer");
const express = require("express");
const router = express.Router();

//callback function is the 'route' handler
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  //input validation
  //use validation function

  const { error } = validate(req.body); // result.error, this is object destructuring

  if (error) {
    //400 BAD Request
    return res.status(400).send(result.error.details[0].message);
  }

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });

  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body); // result.error, this is object destructuring

  if (error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!customer) {
    return res.status(404).send("the genre with given id not found");
  }
  //return updated course to client
  res.send(customer);
});

//now write app delete

router.delete("/:id", async (req, res) => {
  //look up genre id
  const customer = await Customer.findByIdAndRemove(req.params.id);
  //not exist, return 404
  if (!customer) {
    res.status(404).send("The customer with the given ID was not found"); // return 404
    return;
  }
  //return the same course
  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findbyId(req.params.id);
  //writing query logic
  if (!customer) {
    return res.status(404).send("The customer with the given ID was not found"); // return 404
  }
  res.send(customer);
});

module.exports = router;
