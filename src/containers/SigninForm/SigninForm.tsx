import React from 'react';
import { Input } from '../../components/Input';
import styles from './SigninForm.module.scss';

export const SigninForm = () => {
  return (
    <div className={styles.signinFormContainer}>
      <div className={styles.signinFormInputContainer}>
        <Input type="email" labelName="Your Email" />
        <Input type="password" labelName="Your Password" />
      </div>
    </div>
  );
};
