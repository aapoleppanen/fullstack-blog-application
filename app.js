const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const postRouter = require("./controllers/posts");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const healthCheckRouter = require("./controllers/healthCheck");
const middleware = require("./utils/middleware");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");

const mongoUrl = config.MONGODB_URI;
console.log(mongoUrl, "mongourl");
console.log(config.PORT, "port");
mongoose
	.connect(mongoUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		logger.info("Connected to MongoDB");
	})
	.catch((error) => {
		logger.error("Error connecting to mongoDB", error.message);
	});

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/blogs", postRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/health", healthCheckRouter);

if (process.env.NODE_ENV === "test") {
	console.log("app.js test if statement")
	const testingRouter = require("./controllers/testing");
	app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
