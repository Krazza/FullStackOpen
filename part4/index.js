const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

const PORT = config.PORT;
app.listen(PORT, () => {
    logger.info(`SERVER RUNNING ON PORT: ${PORT}`)
})