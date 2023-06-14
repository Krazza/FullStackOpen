require("dotenv").config();

const PORT = process.env.PORT;
const userName = encodeURIComponent(process.env.ATLAS_U);
const password = encodeURIComponent(process.env.ATLAS_P);
const PRODUCTION_MONGO_URI = `mongodb+srv://${userName}:${password}@fullstackopen.yllslkv.mongodb.net/BlogListApp?retryWrites=true&w=majority`
const TEST_MONGO_URI = `mongodb+srv://${userName}:${password}@fullstackopen.yllslkv.mongodb.net/testBlogListApp?retryWrites=true&w=majority`;

const MONGO_URI = process.env.NODE_ENV === "test" ? TEST_MONGO_URI : PRODUCTION_MONGO_URI;

module.exports = {
    URI : MONGO_URI,
    PORT : PORT,
}