const { NEW_RELIC_LICENSE_KEY, NEW_RELIC_APP_NAME } = process.env;

exports.config = {
    //app_name: NEW_RELIC_APP_NAME,
    //license_key: NEW_RELIC_LICENSE_KEY,
    app_name: "App3",
    license_key: "712ca73fbe7891d6b3f5d214f6f1523fFFFFNRAL",
    logging: {
      level: 'info'
    }
  }; 
  