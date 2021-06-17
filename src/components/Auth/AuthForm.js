import { useState, useRef } from 'react';
import { restApikey } from '../../keys'
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault()
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true)
    let url
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + restApikey
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + restApikey
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers: {
        'content-type': 'application/json'
      }
    }).then(resp => {
      if (resp.ok) {
        return resp.json()
      }
      else {
        return resp.json().then(data => {
          // show error modal
          let errorMessage = 'AUthentication failed'
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message
          }
          // alert(errorMessage)
          throw new Error(errorMessage)
        })
      }
    })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        alert(err.message)
      })
    setIsLoading(false)
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending Request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
