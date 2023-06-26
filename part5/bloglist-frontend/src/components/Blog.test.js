import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import  userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {

    let container;
    const updateBlog = jest.fn(); 
    const removeBlog = jest.fn();
    const blog = {
        title : "learning react testing library",
        author : "Facebook",
        url : "www.Facebook.com",
        likes : 2235,
        user : {
            id : "6491de2320b4c0c9250ac429",
            name : "test"
        }
    };
    const owner = "Kevin";

    beforeEach(() => {
        container = render(
            <Blog updateBlog={updateBlog} removeBlog={removeBlog} owner={owner} blog={blog}/>
        ).container
    })

    test("blog's title and author are being rendered", () => {
        const blogTitle = screen.getByText("learning react testing library");
        const blogAuthor = screen.getByText("Facebook" , { exact : false });

        const blogUrl = screen.queryByText("www.Facebook.com");
        const blogLikes = screen.queryByText(2235);
        expect(blogUrl).toBeNull();
        expect(blogLikes).toBeNull();
    })

    test("showing likes and url after clicking the button", async () => {
        const user = userEvent.setup();
        const button = container.querySelector(".blogExpandButton");

        await user.click(button);

        const blogUrl = screen.getByText("www.Facebook.com" , { exact : false });
        const blogLikes = screen.getByText(2235 , { exact : false });
        
        screen.debug();
    })
})

