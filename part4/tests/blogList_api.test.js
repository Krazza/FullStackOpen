const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("../tests/test_helper");
const { Blog } = require("../models/Blog");
const app = require("../app");

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log("CLEARED");

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
})

test("get the correct number of blogs in the correct format", async () => {
    const response = await api
    .get("/api/bloglist")
    .expect(200)
    .expect("Content-Type", /application\/json/)

    expect(response.body.length).toBe(3);
})

test("objects are identified by id", async () => {
    const response = await api
    .get("/api/bloglist")
    .expect(200)
    
    const blogs = response.body;
    for(let blog of blogs) {
        expect(blog.id).toBeDefined();
    }
})