const { Blog } = require("../models/Blog");

const initialBlogs = [
    {
        title: "Clever books",
        author: "Stephen King",
        url: "https://king.com",
        likes: 142,
        id: "648877f91e22a33a46c0fb27"
    },
    {
        title: "Tasty fruits",
        author: "Kevin",
        url: "https://kevinsfruits.com",
        likes: 21,
        id: "148877f99e92a32a46c0fb23"
    },
    {
        title: "Valorant guides",
        author: "SEN TENZ",
        url: "https://sentenzguides.com",
        likes: 5000,
        id: "648877f99e92a32a46c0fb27"
    }
];

const blogsInDB = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
}

module.exports = {
    initialBlogs,
    blogsInDB
}