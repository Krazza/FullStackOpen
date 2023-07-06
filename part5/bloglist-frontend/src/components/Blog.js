import React, { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, updateBlog, removeBlog, owner }) => {

    const [showDetails, setShowDetails] = useState(false)

    const handleToggle = (event) => {
        event.preventDefault()
        setShowDetails(!showDetails)
    }

    const handleLike = async (event) => {
        event.preventDefault()
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
        event.preventDefault()
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
        <div style={blogStyle} className={blog.title}>
            {showDetails ?
                <div >
                    <h4 style={inlineStyle} className="blogTitle">{blog.title}</h4>{showDetails && <button className="blogHideButton" style={buttonStyle} onClick={handleToggle}>{"hide"}</button>}
                    <p className="blogAuthorExpanded">{"AUTHOR : "}{blog.author}</p>
                    <p className="blogUrl">{"URL : "}{blog.url}</p>
                    <p className="blogLikes" style={inlineStyle}>{"LIKES : "}{blog.likes}</p><button className="blogLikeButton" style={buttonStyle} onClick={handleLike}>{"like"}</button>
                    <p className="blogEditor">{`Added by: ${blog.user.name}`}</p>
                </div>
                :
                <div>
                    <h4 style={inlineStyle} className="blogTitle">{blog.title}</h4>
                    <p style={inlineStyle} className="blogAuthorCollapsed">{` by ${blog.author}`}</p>
                    {!showDetails && <button className="blogExpandButton" style={buttonStyle} onClick={handleToggle}>{"view"}</button>}
                </div>}
            {(blog.user.name === owner) && <button className="blogRemoveButton" onClick={handleRemoval}>{"remove"}</button>}
        </div>)
}

Blog.propTypes = {
    blog : PropTypes.object.isRequired,
    updateBlog : PropTypes.func.isRequired,
    removeBlog : PropTypes.func.isRequired,
    owner : PropTypes.string.isRequired
}

export default Blog