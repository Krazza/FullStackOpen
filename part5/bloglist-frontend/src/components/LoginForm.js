import React from "react"

const LoginForm = ({ handleLogin, handleUsernameChange, handlePasswordChange, username, password }) => {
    return(
        <form onSubmit={handleLogin}>
            <h2>{"Log in"}</h2>
            <div>
                {"username"}
                <input type="text" name="userName" id="userName" onChange={handleUsernameChange}/>
            </div>
            <div>
                {"password"}
                <input type="password" name="password" id="password" onChange={handlePasswordChange}/>
            </div>
            <button type="submit" id="loginButton">{"login"}</button>
        </form>
    )
}

export default LoginForm