const amqp = require('amqplib');
const config = require("../config/rabbit.config.js");
var { catchErrorServer } = require("../utils/loggerFunctions");

async function connect() {
  try {
    const connection = await amqp.connect(config.HOST);
    const channel = await connection.createChannel();
    return channel;
  } catch (error) {    
    catchErrorServer(
      "connect Rabbit",
      "An error occurred during connection Queue rabbit.",
      error
    ); 
  }
}

module.exports = { connect };