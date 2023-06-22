import React from "react"

const LoginForm = ({handleLogin, handleUsernameChange, handlePasswordChange, username, password}) => {
    return(
        <form onSubmit={handleLogin}>
            <h2>{"Log in"}</h2>
            <div>
				{"username"}
				<input type="text" name="userName" onChange={handleUsernameChange}/>
			</div>
			<div>
				{"password"}
				<input type="password" name="password" onChange={handlePasswordChange}/>
			</div>
			<button type="submit">{"login"}</button>
		</form>
    )
}

export default LoginForm;