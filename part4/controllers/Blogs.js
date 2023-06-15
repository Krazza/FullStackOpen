const blogsRouter = require("express").Router();
const { Blog } = require("../models/Blog");

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
})
  
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if(!request.body.title) {
        response.status(400).send({ error: 'missing title' });
    } else if(!request.body.url) {
        response.status(400).send({ error: 'missing url' });
    } else {
        if(!(Object.hasOwn(request.body, "likes"))) {
            blog["likes"] = 0;
        }
        const savedBlog = await blog.save();
        response.status(201).json(savedBlog)
    }
})

blogsRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
})

blogsRouter.put("/:id", async (request, response) => {
    
})

module.exports = blogsRouter;