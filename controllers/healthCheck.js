const healthCheckRouter = require("express").Router();

healthCheckRouter.get("/", async (req, res) => {
	res.send("ok");
});

module.exports = healthCheckRouter;
