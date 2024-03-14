import React, { useState } from 'react';
import Login from './RegisterAndLogin/Login';
import Register from './RegisterAndLogin/Register';

const App = () => {
  const [isLoginView, setIsLoginView] = useState(true);


  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div>
      {isLoginView ? (
        <Login onRegisterClick={toggleView} />
      ) : (
        <Register onRegisterClick={toggleView} />
      )}
    </div>
  );
};

export default App;
