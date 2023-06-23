import React, { useState } from "react";

const Blog = ({blog, updateBlog, removeBlog, owner}) => {

  const [showDetails, setShowDetails] = useState(false);

  const handleToggle = (event) => {
    event.preventDefault();
    setShowDetails(!showDetails);
  }

  const handleLike = async (event) => {
    event.preventDefault();
    try{
      const updatedBlog = {
        title : blog.title,
        author : blog.author,
        url : blog.url,
        likes : blog.likes + 1,
        user : blog.user.id,
        id: blog.id
      }
      await updateBlog(updatedBlog)
    } catch(error) {
      console.log(error)
    }
  }

  const handleRemoval = async (event) => {
    event.preventDefault();
    if(window.confirm(`Do you really want to remove blog ${blog.title} by ${blog.author}?`))
    {
      try {
        await removeBlog(blog.id)
      } catch(error) {
        console.log(error)
      }
    }
  }

  const inlineStyle = {
    display : "inline"
  }

  const blogStyle = {
    marginBottom : "20px",
    borderStyle : "solid",
    width : "500px",
    padding : "5px"
  }

  const buttonStyle = {
    display : "inline",
    margin : "8px"
  }

  return(
  <div style={blogStyle}>
    {showDetails ? 
    <div >
      <h4 style={inlineStyle}>{blog.title}</h4>{showDetails && <button style={buttonStyle} onClick={handleToggle}>{"hide"}</button>}
      <p>{"AUTHOR : "}{blog.author}</p>
      <p>{"URL : "}{blog.url}</p>
      <p style={inlineStyle}>{"LIKES : "}{blog.likes}</p><button style={buttonStyle} onClick={handleLike}>{"like"}</button>
      <p>{`Added by: ${blog.user.name}`}</p>
    </div>
    :
    <div>
      <h4 style={inlineStyle}>{blog.title}</h4>{!showDetails && <button style={buttonStyle} onClick={handleToggle}>{"view"}</button>}
    </div>}
    {(blog.user.name === owner) && <button onClick={handleRemoval}>{"remove"}</button>}
  </div>)  
}

export default Blog