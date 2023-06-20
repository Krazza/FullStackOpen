const logger = require("./logger");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const requestLogger = (request, response, next) => {
    logger.info("Method: ", request.method);
    logger.info("Path: ", request.path);
    logger.info("Body: ", request.body);
    logger.info("---");
    next();
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get("authorization");
    if(authorization && authorization.startsWith("Bearer ")) {
        request.token = authorization.replace("Bearer ", "");
    }
    next();
}

const userExtractor = async (request, response, next) => {
    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    request.user = user;
    next();
}

const unknownEndPoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint"})
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    if(error.name === "CastError") {
        return response.statis(400).send({ error : "malformatted id" });
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error : error.message })
    } else if (error.name ===  'JsonWebTokenError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

module.exports = {
    requestLogger,
    unknownEndPoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}