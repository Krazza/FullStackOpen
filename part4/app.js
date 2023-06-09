const config = require("./utils/config");
const express = require('express');
require('express-async-errors')
const app = express();
const cors = require('cors');
const blogsRouter = require("./controllers/Blogs");
const userRouter = require("./controllers/Users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

logger.info("ENVIRONMENT: ", process.env.NODE_ENV);
logger.info("CONNECTING TO: ", config.URI);

mongoose.connect(config.URI)
.then(() => {
    logger.info("SUCCESSFULLY CONNECTED TO MongoDB");
})
.catch((error) => {
    logger.error("FAILED TO CONNECT TO MongoDB: ", error.message);
})

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/bloglist", blogsRouter);
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)

if (process.env.NODE_ENV === "test") {
    console.log("running in test mode")
    const testingRouter = require("./controllers/testing");
    app.use("/api/testing", testingRouter)
}

app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app;