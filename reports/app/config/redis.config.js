const { REDIS_DOCKER_HOST, REDIS_DOCKER_PORT, REDIS_DOCKER_PASSWORD } =
  process.env;

module.exports = {
  REDIS_DOCKER_HOST: "localhost",
  REDIS_DOCKER_PORT: "6379",
  REDIS_DOCKER_PASSWORD: "",
};
