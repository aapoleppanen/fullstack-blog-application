const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");

const server = http.createServer(app);

console.log(server, "We have reached index.js");

server.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`);
});
