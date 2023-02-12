import React, { useState } from 'react';
const logo_image=require('../Assets/login-logo.png')
const Login = ({handleLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    sessionStorage.setItem('user',username);
    // localStorage.setItem('luser',user) 
    
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials : 'include'
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
    <div>
      <div class="justify-content-center align-items-sm-right text-light bg-dark">
       </div>
      <div class="d-flex flex-row  justify-content-center align-items-sm-around" id="login-div" >
      <div class="p-2">
        
        <img src={logo_image} alt='logo' width="200"/>

       
      </div>
      <div class="form-group  d-flex p-2 justify-content-center"  >
    <form onSubmit={handleSubmit}>
      <label for ="first">User ID</label>
      <input
      class="form-control"
        type="text"
        id="first"
        value={username}
        onChange={event => setUsername(event.target.value)}
        placeholder="ID"
      />
      <label for ="second">Password</label>
      <input
      class="form-control"
        type="password"
        id="second"
        value={password}
        onChange={event => setPassword(event.target.value)}
        placeholder="Password"
      />
      <br></br>
      <button type="submit" class="btn btn-success">Login</button>
      {error && <div>{error}</div>}
    </form>
    </div>
  
  
</div>
    </div>
    

  );
};

export default Login;
