import React from 'react';
import { Input } from '../../components/Input';
import styles from './SigninForm.module.scss';
import { Button } from '../../components/Button';

export const SigninForm = () => {
  return (
    <div className={styles.signinFormContainer}>
      <div className={styles.signinFormInputContainer}>
        <h1 className={styles.signinFormHeading}>Login to your account</h1>
        <Input type="email" labelName="Your Email" />
        <Input type="password" labelName="Your Password" />
        <div className={styles.signinUtilities}>
          <div className={styles.signinRememberContainer}>
            <input type="checkbox"></input>
            <label>Remember me</label>
          </div>
          <p>Forgot Password?</p>
        </div>
        <Button>
          <p>Sign in</p>
        </Button>
      </div>
    </div>
  );
};
