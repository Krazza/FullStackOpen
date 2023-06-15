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
describe("blogs are in a correct format", () => {
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
    
    test("every blog has to have likes", async () => {
        const blogsAtTheStart = helper.initialBlogs;
        const newBlog = {
            title: "Path of Exile guides",
            author: "Quin69",
            url: "https://www.twitch.tv/quin69",
        }
    
        await api
        .post("/api/bloglist")
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const blogsAtTheEnd = await helper.blogsInDB();
        expect(blogsAtTheEnd).toHaveLength(blogsAtTheStart.length + 1);
    
        for(let blog of blogsAtTheEnd) {
            expect(blog).toHaveProperty("likes");
        }
    })
})

describe("addition of a blog", () => {
    test("blog being saved successfully", async () => {
        const blogsAtTheStart = helper.initialBlogs;
        const newBlog = {
            title: "Diablo 4 guides",
            author: "Quin69",
            url: "https://www.twitch.tv/quin69",
            likes: 772003,
        }
    
        await api
        .post("/api/bloglist")
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const blogsAtTheEnd = await helper.blogsInDB();
        expect(blogsAtTheEnd).toHaveLength(blogsAtTheStart.length + 1);
    
        const titles = blogsAtTheEnd.map(blog => blog.title);
        expect(titles).toContain("Diablo 4 guides");
    })

    test("a blog without a title is not added", async () => {
        const blogsAtTheStart = helper.initialBlogs;
        const newBlog = {
            author: "Quin69",
            url: "https://www.twitch.tv/quin69",
        }
    
        await api
        .post("/api/bloglist")
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
        const blogsAtTheEnd = await helper.blogsInDB();
        expect(blogsAtTheEnd).toHaveLength(blogsAtTheStart.length);
    })
    
    test("a blog without a url is not added", async () => {
        const blogsAtTheStart = helper.initialBlogs;
        const newBlog = {
            title: "Path of Exile 2 guides",
            author: "Quin69",
        }
    
        await api
        .post("/api/bloglist")
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
        const blogsAtTheEnd = await helper.blogsInDB();
        expect(blogsAtTheEnd).toHaveLength(blogsAtTheStart.length);
    })
})

describe("deletion of a blog", () => {
    test("successful deletion with valid data", async () => {
        const blogsAtTheStart = await helper.blogsInDB();
        const blogToDelete = blogsAtTheStart[0];
    
        await api
        .delete(`/api/bloglist/${blogToDelete.id}`)
        .expect(204)
    
        const blogsAtTheEnd = await helper.blogsInDB();
        expect(blogsAtTheEnd).toHaveLength(blogsAtTheStart.length - 1);
    
        const titles = blogsAtTheEnd.map(blog => blog.title);
        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe("update of a blog", () => {
    test("successful update of the likes of an individual blog", async () => {
        const blogsAtTheStart = await helper.blogsInDB();
        const blogToUpdate = blogsAtTheStart[0];

        blogToUpdate.likes += 1;

        await api
        .put(`/api/bloglist/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/);

        const blogsAtTheEnd = await helper.blogsInDB();
        const updatedBlog = blogsAtTheEnd.find(blog => blog.title === blogToUpdate.title);
        expect(updatedBlog.likes).toBe(blogToUpdate.likes);
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})