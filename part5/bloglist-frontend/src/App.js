import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification/Notification'

const App = () => {

const [title, setTitle] = useState("");
const [author, setAuthor] = useState("");
const [url, setUrl] = useState("");
const [likes, setLikes] = useState();

const [blogs, setBlogs] = useState([]);
const [user, setUser] = useState(null);
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const [notification, setNotification] = useState(null);
const [errorOccured, setErrorOccured] = useState(false);

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

  const loginForm = () => {
    return(
        <form onSubmit={handleLogin}>
            <h2>{"Log in"}</h2>
            <div>
				{"username"}
				<input type="text" value={username} name="userName" onChange={({target}) => setUsername(target.value)}/>
			</div>
			<div>
				{"password"}
				<input type="password" value={password} name="password" onChange={({target}) => setPassword(target.value)}/>
			</div>
			<button type="submit">{"login"}</button>
		</form>
    )
  }

  const handleNewBlog = async (event) => {
    event.preventDefault();
    
    const newBlog = {
        title : title,
        author : author,
        url : url,
        likes : likes
    }
    
    try{
        const response = await blogService.create(newBlog);
        console.log(response);
        setNotification(`A new blog created by ${author}!`);
        setTimeout(() => {
            setNotification(null);
            setErrorOccured(false);
            }, 6000)
        setErrorOccured(false);
        setAuthor("");
        setTitle("");
        setUrl("");
        setLikes(null);

        

        
    } catch(exception)
    {
        console.log("didn't publish")
    }
  }

  const blogForm = () => {
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