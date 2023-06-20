var { logger } = require("../utils/logger.js");
var { catchErrorServer } = require("../utils/loggerFunctions.js");
const controllerPurchase = require("../controllers/purchase.controller");
const controllerSale = require("../controllers/sale.controller");

function consumeMessage(message) {
  try {
    
    const jsonMessage = JSON.parse(message.content.toString());
    
    if(jsonMessage.type === "S"){
      controllerSale.add(jsonMessage);
    }else if (jsonMessage.type === "P"){
      controllerPurchase.add(jsonMessage);
    }
    logger.info({
      action: "consumeMessage",
      message: jsonMessage,
      type: jsonMessage.type
    });
  } catch (error) {
    logger.error({
      message: `An error occurred get message.`,
      error_message: error.message,
      error_stack: error.stack,
      error_type: error.name,
    });
  }    
}

module.exports = { consumeMessage };