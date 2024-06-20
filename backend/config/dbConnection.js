const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbConnection = () => {
  mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
      console.log(`database connected successfully`);
    })
    .catch((err) => {
      console.log(`error occured while connecting database: ${err}`);
      process.exit(1);
    });
};

module.exports = dbConnection;
