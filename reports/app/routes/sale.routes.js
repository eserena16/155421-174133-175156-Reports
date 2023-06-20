const controller = require("../controllers/sale.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "authorization");
    next();
  });

  app.get(
    "/api/sale/topProducts",
    [],
    controller.topProducts
  );
  
};
