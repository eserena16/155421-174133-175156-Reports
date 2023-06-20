var { logger } = require("../utils/logger");
const config = require("../config/db.config.js");
const configMQ = require("../config/rabbit.config");
const amqp = require('amqplib');
const mongoose = require('mongoose');

exports.get = async (req, res) => {  
  let errorMessage = "";
  try {
    mongoose.connect(config.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });    
  } catch (error) {    
    logger.error({
      action: "healthcheck",
      message: `Error connecting to database.`,
      errorMessage: error.message,
      errorStack: error.stack,
      errorType: error.name,
    });
    errorMessage += "Error connecting to database. ";
  }

  try {
    const connection = await amqp.connect(configMQ.HOST);
    const channel = await connection.createChannel();
    await channel.close();
    await connection.close();
  } catch (error) {    
    logger.error(
      "connection queue",
      "An error occurred during connection queue.",
      error      
    );
    errorMessage += "Error connecting to queue. ";
  }

  if (errorMessage !== "") {
    res.status(503).send(
      {
        message: errorMessage,
      }
    );
  } else {
    res.status(200).send(
      {
        message: `Database connection and queue connection successful.`,
      }
    );
  }
};
