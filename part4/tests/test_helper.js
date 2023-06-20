const { Blog } = require("../models/Blog");
const { User } = require("../models/user");


const testToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjY0OTFkZTIzMjBiNGMwYzkyNTBhYzQyOSIsImlhdCI6MTY4NzI4NDAzOX0.v9dE9QyogpAAL8eJ89tc0PUg2l5wkgaD4HgHk0uUdZ0";

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

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()
  
    return blog._id.toString()
}

const blogsInDB = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
}

const usersInDB = async () => {
    const users = await User.find({});
    return users.map(user => user.toJSON())
}


module.exports = {
    initialBlogs,
    blogsInDB,
    nonExistingId,
    usersInDB,
    testToken
}