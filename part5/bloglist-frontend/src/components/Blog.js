import React, { useState } from "react";

const Blog = ({blog}) => {

  const [showDetails, setShowDetails] = useState(false);

  const handleToggle = (event) => {
    event.preventDefault();
    setShowDetails(!showDetails);
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
      <p style={inlineStyle}>{"LIKES : "}{blog.likes}</p><button style={buttonStyle}>{"like"}</button>
      <p>{`Added by: ${blog.user.name}`}</p>
    </div>
    :
    <div>
      <h4 style={inlineStyle}>{blog.title}</h4>{!showDetails && <button style={buttonStyle} onClick={handleToggle}>{"view"}</button>}
    </div>}
  </div>)  
}

export default Blog