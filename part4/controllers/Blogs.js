const blogsRouter = require("express").Router();
const { default: mongoose } = require("mongoose");
const { Blog } = require("../models/Blog");
const { User } = require("../models/user");

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { name : 1});
    response.json(blogs);
})
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body;

    if(!request.body.title) {
        response.status(400).send({ error: 'missing title' });
    } else if(!request.body.url) {
        response.status(400).send({ error: 'missing url' });
    } else {
        const users = await User.find({});
        const blog = new Blog({
            title : body.title,
            author : body.author,
            url : body.url,
            likes : body.likes,
            user : users[0].id
        })

        if(!(Object.hasOwn(request.body, "likes"))) {
            blog["likes"] = 0;
        }
        const savedBlog = await blog.save();
        users[0].blogs = users[0].blogs.concat(savedBlog._id);
        await users[0].save();
        response.status(201).json(savedBlog)
    }
})

blogsRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
})

blogsRouter.put("/:id", async (request, response) => {
    const blog = request.body;

    if(!request.body.title) {
        response.status(400).send({ error: 'missing title' });
    } else if(!request.body.url) {
        response.status(400).send({ error: 'missing url' });
    } else {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new : true })
        response.status(200).json(updatedBlog);
    }
})

module.exports = blogsRouter;