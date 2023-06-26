import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import  userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {

    let container;
    const handleNewBlog = jest.fn();

    beforeEach(() => {
        container =  render(
            <BlogForm createBlog={handleNewBlog} />
        ).container;
    })

    test("the form calls the event handler it received as props with the right details", async () => {
        
        const user = userEvent.setup();
        const inputTitle = container.querySelector(".newBlogTitle");
        const inputAuthor = container.querySelector(".newBlogAuthor");
        const inputUrl = container.querySelector(".newBlogUrl");
        const inputLikes = container.querySelector(".newBlogLikes");
        const submitButton = screen.getByText("add");

        await user.type(inputTitle, "Hello World!");
        await user.type(inputAuthor, "Linus Torvalds");
        await user.type(inputUrl, "www.linux.com");
        await user.type(inputLikes, "9090032");

        await user.click(submitButton);

        expect(handleNewBlog.mock.calls).toHaveLength(1);

        expect(handleNewBlog.mock.calls[0][0].title).toBe("Hello World!");
        expect(handleNewBlog.mock.calls[0][0].author).toBe("Linus Torvalds");
        expect(handleNewBlog.mock.calls[0][0].url).toBe("www.linux.com");
        expect(handleNewBlog.mock.calls[0][0].likes).toBe(9090032);
    })
})