import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/notification/Notification"
import Togglable from "./components/Toggleable"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"

const App = () => {

    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [notification, setNotification] = useState(null)
    const [errorOccured, setErrorOccured] = useState(false)

    const [udpt, setUpdt] = useState(0)

    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs.sort((a, b) => (a.likes > b.likes) ? -1 : (b.likes > a.likes) ? 1 : 0) )
        )
    }, [user, udpt])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedInBlogAppUser")
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const blogForm = () => {
        return (
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm createBlog={addBlog}/>
            </Togglable>)
    }

    const loginForm = () => {
        return (<LoginForm handleLogin={handleLogin} handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange} username={username}
            password={password}/>)
    }

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem("loggedInBlogAppUser")
        setUser(null)
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login(username, password)

            window.localStorage.setItem("loggedInBlogAppUser", JSON.stringify(user))

            blogService.setToken(user.token)
            setUser(user)
            setNotification(`Welcome ${user.name}!`)
            setTimeout(() => {
                setNotification(null)
                setErrorOccured(false)
            }, 6000)
            setErrorOccured(false)
            setUsername("")
            setPassword("")
        } catch (exception) {
            setNotification("Wrong credentials!")
            setErrorOccured(true)
            setTimeout(() => {
                setNotification(null)
                setErrorOccured(false)
            }, 6000)
            console.log("WRONG CREDENTIALS", exception)
        }
    }

    const handleUsernameChange = (event) => {
        event.preventDefault()
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        event.preventDefault()
        setPassword(event.target.value)
    }

    const addBlog = async (blogObject) => {
        try{
            blogFormRef.current.toggleVisibility()
            const response = await blogService.create(blogObject)
            const tempUpdt = udpt + 1
            setBlogs(blogs.concat(response))
            setNotification(`A new blog created by ${response.author}!`)
            setTimeout(() => {
                setNotification(null)
                setErrorOccured(false)
            }, 6000)
            setErrorOccured(false)
            setUpdt(tempUpdt)
        } catch(error) {
            console.log(error)
        }
    }

    const updateBlog = async (blogObject) => {
        try {
            const response = await blogService.update(blogObject)
            const tempUpdt = udpt + 1
            setBlogs(blogs.filter(blog => {
                if(blog.id === response.id)
                    return response
                else
                    return blog
            }))
            setNotification(`Successfully updated blog "${response.title}"!`)
            setTimeout(() => {
                setNotification(null)
                setErrorOccured(false)
            }, 6000)
            setUpdt(tempUpdt)
        } catch (error) {
            console.log(error)
        }
    }

    const removeBlog = async (id) => {
        try{
            await blogService.removeOne(id)
            const tempUpdt = udpt + 1
            setBlogs(blogs.filter(blog => blog.id !== id))
            setNotification("Successfully removed a blog")
            setTimeout(() => {
                setNotification(null)
                setErrorOccured(false)
            }, 6000)
            setUpdt(tempUpdt)
        } catch(error){
            console.log(error)
        }
    }

    return (
        <div className="blogContainer">
            <Notification message={notification} errorOccured={errorOccured}/>
            { user === null ? loginForm()
                :
                <div>
                    <p>{user.name} {" is logged in"}</p>
                    <button onClick={handleLogout}>{"log out"}</button>
                    {blogForm()}
                    <h2>{"blogs"}</h2>
                    {blogs.map(blog => <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} owner={user.name}/>)}
                </div>}
        </div>
    )
}

export default App