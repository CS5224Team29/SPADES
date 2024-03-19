import React, { useState } from 'react';
import { signUp } from '../../Cognito/CognitoAuth';
import { useNavigate } from 'react-router-dom';
import Tooltip from '../../Components/Tooltip/Tooltip';
import './RegisterPage.css';
import Notification from '../../Components/Notification/Notification';

const Register = ({ onRegisterClick }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });

    const navigate = useNavigate();

    const clearErrors = () => {
        setEmailError('');
        setUsernameError('');
        setPasswordError('');
        setConfirmPasswordError('');
    };

    const validateForm = (username, email, password, confirmPassword) => {
        clearErrors();
        let isValid = true;

        const usernameRegex = /^[A-Za-z0-9_-]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!usernameRegex.test(username)) {
            setUsernameError('Username must consist of letters, numbers, underscores, or hyphens.');
            isValid = false;
        }

        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
            isValid = false;
        }

        if (!passwordRegex.test(password)) {
            setPasswordError('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).');
            isValid = false;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            isValid = false;
        }

        return isValid;
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        signUp(username, email, password).then(
            () => {
                console.log('Registration successful');
                setNotification({ message: 'Registration successful', type: 'success' });
                navigate('/dashboard');
            },
            (err) => {
                console.error('Registration failed:', err);
                setNotification({ message: 'Registration failed:' + err, type: 'error' });

            }
        );
    };

    return (
        <>
            <Notification message={notification.message} type={notification.type} />
            <div className="register-container">
                <div className="register-card">
                    <h2>Create new account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    clearErrors();
                                }}
                            />
                            <Tooltip message={usernameError} visible={!!usernameError} />

                        </div>
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Email"
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
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    clearErrors();
                                }}
                            />
                            <Tooltip message={passwordError} visible={!!passwordError} />

                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    clearErrors();
                                }}
                            />
                            <Tooltip message={confirmPasswordError} visible={!!confirmPasswordError} />

                        </div>
                        <button type="submit">Register Account</button>
                        <p className="or">OR</p>
                        <button type="button" onClick={onRegisterClick}>
                            Back to Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
