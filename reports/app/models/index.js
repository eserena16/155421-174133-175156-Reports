const config = require("../config/db.config.js");
const mongoose = require('mongoose');
const { logger } = require("../utils/logger");

mongoose.connect(config.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {    
    logger.info({
      action: "connect",
      message: `Connect to MongoDB`,
      tags: ["server", "startup"],
    });
  })
  .catch((error) => {
    logger.error({
      action: "connect",
      message: `Error to connect MongoDB`,
      error
    });
  });
