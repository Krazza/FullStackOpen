import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification/Notification'
import Togglable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {

const [blogs, setBlogs] = useState([]);
const [user, setUser] = useState(null);
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const [notification, setNotification] = useState(null);
const [errorOccured, setErrorOccured] = useState(false);

const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInBlogAppUser");
    if(loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
        blogService.setToken(user.token);
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
    event.preventDefault();
    window.localStorage.removeItem("loggedInBlogAppUser");
    setUser(null);
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
        const user = await loginService.login(username, password);

        window.localStorage.setItem("loggedInBlogAppUser", JSON.stringify(user));

        blogService.setToken(user.token);
        setUser(user);
        setNotification(`Welcome ${user.name}!`)
        setTimeout(() => {
            setNotification(null);
            setErrorOccured(false);
            }, 6000)
        setErrorOccured(false);
        setUsername("");
        setPassword("");
    } catch (exception) {
        setNotification(`Wrong credentials!`)
        setErrorOccured(true);
        setTimeout(() => {
            setNotification(null);
            setErrorOccured(false);
            }, 6000)
        console.log("WRONG CREDENTIALS", exception)
    }
  }

  const handleUsernameChange = (event) => {
    event.preventDefault();
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value)
  }

  const addBlog = async (blogObject) => {
    try{
      blogFormRef.current.toggleVisibility();
      const response = await blogService.create(blogObject);
      setBlogs(blogs.concat(response));
      setNotification(`A new blog created by ${response.author}!`);
      setTimeout(() => {
          setNotification(null);
          setErrorOccured(false);
          }, 6000)
      setErrorOccured(false);
    } catch(exception) {
        console.log(exception)
    }
  }

  return (
    <div>
        <Notification message={notification} errorOccured={errorOccured}/>
        { user === null ? loginForm() 
        : 
        <div>
            <p>{user.name} {" is logged in"}</p>
            <button onClick={handleLogout}>{"log out"}</button>
            {blogForm()}
            <h2>{"blogs"}</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>}
    </div>
  )
}

export default App