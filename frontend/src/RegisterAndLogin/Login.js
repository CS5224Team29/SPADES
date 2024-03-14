import React, { useState } from 'react';
import './LoginPage.css';

const Login = ({ onRegisterClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        //api and checking part
        console.log('Login with:', email, password);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login to your account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login your account</button>
                    <p className="or">OR</p>
                    <button type="button" onClick={onRegisterClick}>
                        Create new account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
