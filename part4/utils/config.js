require("dotenv").config();

const PORT = process.env.PORT;
const userName = encodeURIComponent(process.env.ATLAS_U)
const password = encodeURIComponent(process.env.ATLAS_P)
const uri = `mongodb+srv://${userName}:${password}@fullstackopen.yllslkv.mongodb.net/BlogListApp?retryWrites=true&w=majority`

module.exports = {
    URI : uri,
    PORT : PORT
}