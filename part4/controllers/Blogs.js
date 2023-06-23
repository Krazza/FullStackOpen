const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");
const { default: mongoose } = require("mongoose");
const { Blog } = require("../models/Blog");
const { User } = require("../models/user");

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { name : 1});
    response.json(blogs);
})
  
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body;
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if(!decodedToken.id) {
        return response.status(401).json({ error : "token invalid"})
    }

    if(!request.body.title) {
        response.status(400).send({ error: 'missing title' });
    } else if(!request.body.url) {
        response.status(400).send({ error: 'missing url' });
    } else {
        const user = request.user;
        const blog = new Blog({
            title : body.title,
            author : body.author,
            url : body.url,
            likes : body.likes,
            user : user._id
        })

        if(!(Object.hasOwn(request.body, "likes"))) {
            blog["likes"] = 0;
        }
        const savedBlog = await blog.save();
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();
        response.status(201).json(savedBlog)
    }
})

blogsRouter.delete("/:id", middleware.userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    const user = request.user;

    if(user.id.toString() === blog.user.toString()) {
        await Blog.findByIdAndRemove(request.params.id);
    } else {
        response.status(401).json({ error : "invalid token" })
    }
    response.status(204).end();
})

blogsRouter.put("/:id", middleware.userExtractor, async (request, response) => {
    const body = request.body;
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if(!decodedToken.id) {
        return response.status(401).json({ error : "token invalid"})
    }

    if(!body.title) {
        response.status(400).send({ error: 'missing title' });
    } else if(!body.url) {
        response.status(400).send({ error: 'missing url' });
    } else {
        const user = request.user;
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new : true })
        user.blogs = user.blogs.concat(updatedBlog._id);
        await user.save();
        response.status(200).json(updatedBlog);
    }
})

module.exports = blogsRouter;