const blogsRouter = require("express").Router();
const { Blog } = require("../models/Blog");

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
})
  
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if(!Object.hasOwn(blog), "likes")
        blog["likes"] = 0;
  
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog)
})

module.exports = blogsRouter;