require("dotenv").config();

const connectRabbit = require('./app/connections/rabbitmq');
const messageConsumer = require('./app/consumers/message.consumer');

const newRelic = require("newrelic");
const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "localhost",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

const authAPIKey = require("./app/middlewares/authAPIKey");

app.get("/", (req, res) => {
  res.json({ message: "Reports app." });
});

// routes
app.use((req, res, next) => {    
  authAPIKey.validateApiKey(req, res, next);
});

require("./app/routes/sale.routes")(app);
require("./app/routes/supplier.routes")(app);
require("./app/routes/healthcheck.routes")(app);

const { logger } = require("./app/utils/logger");
const PORT = process.env.NODE_DOCKER_PORT || 8070;
app.listen(PORT, () => {  
  logger.info({
    action: "serverStart",
    message: `Server is running on port ${PORT}.`,
    tags: ["server", "startup"],
  });
});

run();

async function run() {
  try {
    const channel = await connectRabbit.connect();
    if(channel){
      await messageConsumer.startConsumer(channel);      
      logger.info({
        action: "serverStart",
        message: `Consumer queue is running.`,
        tags: ["server", "startup"],
      });
    }    
  } catch (error) {    
    logger.error({
      action: "serverStart",
      message: `Error start server`,
      error: error
    });
  }
}