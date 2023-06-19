const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const app = require("../app");

const api = supertest(app);

describe("one initial user", () => {
    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
    
        await user.save()
    })

    test("creation fails with invalid user data", async () => {
        const usersAtTheStart = await helper.usersInDB();

        const invalidUser = {
            username : "in",
            name : "invalidUser",
            password : "12345"
        }

        await api
        .post("/api/users")
        .send(invalidUser)
        .expect(400)

        const usersInTheEnd = await helper .usersInDB();
        const userNamesInTheEnd = usersInTheEnd.map(user => user.username);

        expect(usersInTheEnd).toHaveLength(usersAtTheStart.length);
        expect(userNamesInTheEnd).not.toContain(invalidUser.username);
    })

    test("creation fails without a username", async () => {
        const usersAtTheStart = await helper.usersInDB();

        const invalidUser = {
            name : "invalidUser",
            password : "12345"
        }

        await api
        .post("/api/users")
        .send(invalidUser)
        .expect(400)

        const usersInTheEnd = await helper .usersInDB();
        const namesInTheEnd = usersInTheEnd.map(user => user.name);

        expect(usersInTheEnd).toHaveLength(usersAtTheStart.length);
        expect(namesInTheEnd).not.toContain(invalidUser.name);
    })

    test("creation fails without a password", async () => {
        const usersAtTheStart = await helper.usersInDB();

        const invalidUser = {
            username : "inra",
            name : "invalidUser",
        }

        await api
        .post("/api/users")
        .send(invalidUser)
        .expect(400)

        const usersInTheEnd = await helper .usersInDB();
        const namesInTheEnd = usersInTheEnd.map(user => user.name);

        expect(usersInTheEnd).toHaveLength(usersAtTheStart.length);
        expect(namesInTheEnd).not.toContain(invalidUser.name);
    })
})