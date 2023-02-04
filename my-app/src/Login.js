import React, { useState } from 'react';


const Login = ({handleLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    sessionStorage.setItem('user',username);
    // localStorage.setItem('luser',user) 
    
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.message === 'Login successful') {
        
        handleLogin(username)
        window.location.href = '/home';
        

      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred while trying to login');
    }
  };

  return (
    <div class="login-form" >
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={event => setUsername(event.target.value)}
        placeholder="Username"
      />
      <br></br>
      <input
        type="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
        placeholder="Password"
      />
      <br></br>
      <button type="submit">Login</button>
      {error && <div>{error}</div>}
    </form>
    </div>
  );
};

export default Login;
