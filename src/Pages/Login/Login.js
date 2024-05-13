import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login({ setIsLoggedIn }) { // Accept setIsLoggedIn as a prop
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [loginError, setLoginError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/laundry_finder/autenticate/login', {
        userEmail: email,
        Password: password
      });
      const { status, message, token, results } = response.data;
      if (status === 200) {
        const { user_id } = results[0];
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user_id);
        setIsLoggedIn(true); // Set isLoggedIn to true
        navigate('/home');
      } else {
        setLoginError(message); // Set error message state
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setLoginError('An error occurred while signing in. Please try again later.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/laundry_finder/autenticate/create', {
        email,
        fullName,
        userName,
        password,
        address,
        contactNumber
      });
      setSignUpSuccess(response.data.message);
    } catch (error) {
      console.error('Error signing up:', error);
      setSignUpSuccess(error.response.data.message);
    }
  };
 
  return (
    <div className={`${styles.centered_container}`}>
      <div className={`${styles.container} ${isSignUpActive ? styles['right-panel-active'] : ''}`}>
        <div className={styles['form-container'] + ' ' + styles['sign-up-container']}>
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            {signUpSuccess && <p className={styles.success}>{signUpSuccess}</p>}
            <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            <input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            <input type="text" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className={styles['form-container'] + ' ' + styles['sign-in-container']}>
          <form onSubmit={handleSignIn}>
            <h1>Sign in</h1>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className={styles['overlay-container']}>
          <div className={styles.overlay}>
            <div className={`${styles['overlay-panel']} ${styles['overlay-left']}`}>
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className={styles.ghost} onClick={handleSignInClick}>Sign In</button>
            </div>
            <div className={`${styles['overlay-panel']} ${styles['overlay-right']}`}>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className={styles.ghost} onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
