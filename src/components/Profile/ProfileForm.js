import { useContext, useRef } from 'react';
import { restApikey } from '../../keys';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordRef = useRef()
  const authContext = useContext(AuthContext)
  const submitHandler = (e) => {
    e.preventDefault()
    const enteredNewpassowrd = newPasswordRef.current.value
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + restApikey, {
      method: 'POST',
      body: JSON.stringify({
        idToken: authContext.token,
        password: enteredNewpassowrd,
        returnSecureToken: false
      }),
      headers: {
        'content-type': 'application/json'
      }
    }).then(resp => {
      //assumption always succeds
      return resp.json()
    })
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={newPasswordRef} type='password' minLength='7' id='new-password' />
      </div>
      <div className={classes.action}>
        <button> Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
