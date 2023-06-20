const config = require("../config/rabbit.config.js");
const { consumeMessage } = require('../services/message.service');
var { logger } = require("../utils/logger.js");
var { catchErrorNotAuth, catchErrorServer } = require("../utils/loggerFunctions.js");

async function startConsumer(channel) {
  try {    
    const queue = config.QUEUE;
    await channel.assertQueue(queue, { durable: true });    
    await channel.consume(queue, consumeMessage, { noAck: true });    
    logger.info({
        action: "consumerStart",
        message: `Consumer started. Waiting for messages.`,
        tags: ["server", "startup"],
    });
  } catch (error) {
    catchErrorServer(
        "consumer Rabbit",
        "Error starting message consumer.",
        error,
    );
  }
}

module.exports = { startConsumer };