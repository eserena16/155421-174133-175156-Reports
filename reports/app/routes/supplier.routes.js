const controller = require("../controllers/purchase.controller");

module.exports = function (app) {  
  app.get("/api/supplier-purchases/:id", controller.getPurchases); 
};
