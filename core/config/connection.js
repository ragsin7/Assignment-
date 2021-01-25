const logger = require('../common/logger');
const mongoose = require('mongoose');
const Constants = require('../../Constants')

module.exports.mongo_init = () => {
  try {
    let mongooseObj = mongoose.connect(Constants.dbUrl, { useUnifiedTopology: true, useNewUrlParser: true });
    mongoose.set('debug', true);

    var db = mongoose.connection;
    db.on('error', (err) => {
      console.log("Error while connecting to database");
      logger.error("Database error ocurred in connection.js", err);
    });

    db.once("open", function () {
      console.log("MongoDB database connection established successfully");
    });

    return mongooseObj
  } catch (e) {
    logger.error("Some error ocurred in connection.js  ", e);
  }
};