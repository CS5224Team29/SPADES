import React, { useState } from 'react';
import './LoginPage.css';
import { signIn } from '../Cognito/CognitoAuth';
import { useNavigate } from 'react-router-dom';
import Tooltip from '../Components/Tooltip/Tooltip';
import Notification from '../Components/Notification/Notification';
const Login = ({ onRegisterClick, onLoginFailure }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });

    const navigate = useNavigate();

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    };

    const validateForm = () => {
        clearErrors();
        let isValid = true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
            isValid = false;
        }

        const passwordRegex = /^[A-Za-z0-9]{6,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError('Password must be at least 6 characters long and contain only letters and numbers.');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        signIn(email, password)
            .then(() => {
                console.log('Login successful');
                setNotification({ message: 'Login successful', type: 'success' });
                navigate('/dashboard');
            })
            .catch(error => {
                console.error('Login failed:', error);
                if (error && error.code === "NotAuthorizedException") {
                    setNotification({ message: 'Login failed, account does not exist.', type: 'error' });

                    setTimeout(() => {
                        onLoginFailure();
                    }, 2000);
                } else {

                    setNotification({ message: 'Login failed', type: 'error' });
                    console.error('Login failed:', error);
                }
            });
    };

    return (
        <>
            <Notification message={notification.message} type={notification.type} />
            <div className="login-container">
                <div className="login-card">
                    <h2>Login to your account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    clearErrors();
                                }}
                            />
                            <Tooltip message={emailError} visible={!!emailError} />


                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    clearErrors();
                                }}
                            />
                            <Tooltip message={passwordError} visible={!!passwordError} />

                        </div>
                        <button type="submit">Login to your account</button>
                        <p className="or">OR</p>
                        <button type="button" onClick={onRegisterClick}>
                            Create new account
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
