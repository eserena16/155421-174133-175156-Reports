const config = require("../config/auth.config");

exports.validateApiKey = (req, res, next) => {
  const apiKey = req.headers['api-key'];
  if (apiKey === config.API_KEY) {
    next();
  } else {
    res.status(401).json({ error: 'Invalid API Key' });
  }
};
