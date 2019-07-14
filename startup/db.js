const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

function db() {
  //const db = config.get("db");
  const db =
    "mongodb://vidlyuser:1234@vidly-shard-00-00-fmuhp.mongodb.net:27017,vidly-shard-00-01-fmuhp.mongodb.net:27017,vidly-shard-00-02-fmuhp.mongodb.net:27017/test?ssl=true&replicaSet=vidly-shard-0&authSource=admin&retryWrites=true&w=majority";
  mongoose.connect(db).then(() => winston.info(`Connected to ${db}...`));
}

module.exports = db;
