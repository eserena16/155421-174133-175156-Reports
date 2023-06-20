const db = require("../models");
var { logger } = require("../utils/logger");
const Purchase = require('../models/purchase.model');
const { catchErrorServer } = require("../utils/loggerFunctions");


exports.add = async (purchase) => {  
  try {
    const newPurchase = new Purchase({
      company: purchase.company,
      purchaseDate: purchase.purchaseDate,
      total: purchase.total,
      supplierId: purchase.supplierId,
      products: purchase.products      
    });
    newPurchase.save();
    logger.info({
      message: `Purchase was created successfully.`,      
      company_id: purchase.company,
      purchase_id: newPurchase.id,
    });
  } catch (error) {
    logger.error({
      message: `An error occurred while creating sale.`,      
      error_message: error.message,
      error_stack: error.stack,
      error_type: error.name,
    });
  }
};

exports.getPurchases = async (req, res) => {
  try {
    const companyId = req.headers['company'];
    const supplierId = req.params.id;
    const purchases = await Purchase.find({ company: companyId, supplierId: supplierId}).select("-_id -__v -products._id");

    if (purchases && purchases.length > 0) {
      return res.send({ purchases });
    } else {
      logger.error({
        action: "getPurchases",
        message: `Purchases does not exist.`,
        purchaseId: req.params.id,        
        companyId: req.companyId
      });
      return res.status(204).send({
        message: `Purchases not found.`,
      });
    }
  } catch (error) {
    return catchErrorServer(
      "deleteProduct",
      "An error occurred during deletion product.",
      error,
      req,
      res
    );
  }
};