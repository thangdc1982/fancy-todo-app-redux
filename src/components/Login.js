import React from 'react';
import './Login.css';
import logo from '../logo.svg';
import { auth, provider } from '../firebase';

function Login() {  
  const onSignIn = () => {    
    auth
      .signInWithPopup(provider)
      .catch(error => alert(error.message))    
  }

  return (
    <div className="login">
      <img src={logo} className="login-logo" alt="logo" />
      <div>
        <button className="login-Button" onClick={onSignIn}>Please Sign In</button>   
      </div>
    </div>
  )
}

export default Login;
