import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Page/RegisterAndLogin/Login';
import Register from './Page/RegisterAndLogin/Register';

const App = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const navigate = useNavigate();

  const toggleView = () => {

    setIsLoginView(!isLoginView);
  };

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  const handleLoginFailure = () => {
    setIsLoginView(false);
    console.log("logview", toggleView)
  };



  return (
    <div>
      {isLoginView ? (
        <Login onRegisterClick={toggleView} onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />
      ) : (
        <Register onRegisterClick={toggleView} onRegisterSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default App;
