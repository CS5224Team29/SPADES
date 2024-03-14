import React, { useState } from 'react';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo((prevLoginInfo) => ({
            ...prevLoginInfo,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // apppppppiapiapdf
        console.log('Login Info:', loginInfo);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={loginInfo.username}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={loginInfo.password}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
