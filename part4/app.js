const config = require("./utils/config");
const express = require('express');
require('express-async-errors')
const app = express();
const cors = require('cors');
const blogsRouter = require("./controllers/Blogs");
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

app.use("/api/bloglist", blogsRouter);

app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app;