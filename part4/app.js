const config = require("./utils/config");
const express = require('express');
const app = express();
const cors = require('cors');
const blogsRouter = require("./controllers/Blogs");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

logger.info("Connecting to ", config.URI);

mongoose.connect(config.URI)
.then(() => {
    logger.info("successfully connected to MongoDB");
})
.catch((error) => {
    logger.error("failed to connect to MongoDB: ", error.message);
})

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/bloglist", blogsRouter);

app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app;