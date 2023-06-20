const db = require("../models");
var { logger } = require("../utils/logger");
const Sale = require("../models/sale.model");

exports.add = async (sale) => {  
  try {
    const newSale = new Sale({
      company: sale.company,
      saleDate: sale.saleDate,
      total: sale.total,
      products: sale.products      
    });
    newSale.save();
    logger.info({
      message: `Sale was created successfully.`,      
      company_id: sale.company,
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

exports.topProducts = async (req, res) => {
  try {
    const companyId = parseInt(req.headers['company']);    
    const topProducts = await Sale.aggregate([
      {
        $match: { company: companyId }
      },
      {
        $unwind: '$products'
      },
      {
        $group: {
          _id: '$products.productId',
          totalCount: { $sum: '$products.count' }
        }
      },
      {
        $sort: { totalCount: -1 }
      },
      {
        $limit: 3
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $project: {
          _id: 0,
          productId: '$_id',
          quantity: '$totalCount',
          productName: { $arrayElemAt: ['$product.name', 0] }
        }
      }
    ]);

    if (topProducts && topProducts.length > 0) {
      return res.send({ topProducts });
    } else {
      logger.info({
        action: "topProducts",
        message: `Sales does not exist.`,
        userId: req.userId,
        companyId: req.companyId,
      });
      return res.status(204).send({
        message: `Sales does not exist.`,
      });
    }
  } catch (error) {
    logger.error({
      action: "topProducts",
      message: `An error occurred during deletion product.`,      
      companyId: req.companyId,
    });  
    return res.status(500).send({
      message: "Internal server error: " + error,
    });  
  }
};
