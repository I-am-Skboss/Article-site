import React, { useState, useEffect } from 'react';
import '../App.css'; // Ensure you import the CSS file
import APIService from '../APIService';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useCookies(['mytoken']);
  const [isLogin, setLogin] = useState(true);

  let navigate = useNavigate(); // useNavigate instead of useHistory

  useEffect(() => {
    if (token['mytoken']) {
      navigate('/articles');
    }
  }, [token, navigate]);

  const loginBtn = () => {
    APIService.LoginUser({ username, password })
      .then(resp => setToken('mytoken', resp.token)) // Correct the usage of setToken
      .catch(error => console.log(error));
  };
  const registerBtn = () =>{
    APIService.RegisterUser({username, password})
    .then(() => loginBtn())
    .catch(error => console.log(error))
  }

  return (
    <div className="App">
      <br />
      <br />
      {isLogin? <h1>Login</h1>: <h1>Register</h1>}
      <br />
      <br />
      <div className='mb-3'>
        <label htmlFor='username' className='form-label'>Username</label>
        <input
          type='text'
          className='form-control'
          id='username'
          placeholder='Please enter Username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='password' className='form-label'>Password</label>
        <input
          type='password'
          className='form-control'
          id='password'
          placeholder='Please enter Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      {isLogin?<button onClick={loginBtn} className='btn btn-primary'>Login</button>:
       <button onClick={registerBtn} className='btn btn-primary'>Register</button>}
      
      <div className="mb-3">
  <br />
  {isLogin ? (
    <h5>
      New user? Click{' '}
      <button className="btn btn-primary" onClick={() => setLogin(false)}>
        Register
      </button>{' '}
      Here
    </h5>
  ) : (
    <h5>
      Existing User? Click{' '}
      <button className="btn btn-primary" onClick={() => setLogin(true)}>
        Login
      </button>{' '}
      Here
    </h5>
  )}
</div>

    </div>
  );
}

export default Login;
