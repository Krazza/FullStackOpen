import React, { useState } from "react"

const BlogForm = ({createBlog}) => {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
    const [likes, setLikes] = useState();

    const handleNewBlog = async (event) => {
        event.preventDefault();
        try{
            createBlog({
                title : title,
                author : author,
                url : url,
                likes : likes
            })
            setTitle("");
            setAuthor("");
            setLikes(null);
            setUrl("");
        } catch(exception) {
            console.log("didn't publish")
        }
    }

    return(
        <form onSubmit={handleNewBlog}>
            <h2>{"Add a new blog"}</h2>
            <div>
                {"title"}
                {" "}
                <input type="text" name="title" onChange={({target}) => setTitle(target.value)} required/>
            </div>
            <div>
                {"author"}
                {" "}
                <input type="text" name="author" onChange={({target}) => setAuthor(target.value)} required/>
            </div>
            <div>
                {"url"}
                {" "}
                <input type="url" name="url" onChange={({target}) => setUrl(target.value)} required/>
            </div>
            <div>
                {"likes"}
                {" "}
                <input type="number" name="likes" onChange={({target}) => setLikes(target.value)}/>
            </div>
            <button type="submit">{"add"}</button>
        </form>
    )
}

export default BlogForm;