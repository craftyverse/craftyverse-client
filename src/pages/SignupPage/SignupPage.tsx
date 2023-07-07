import React from 'react';
import { AuthWrapper } from '../../wrappers/AuthWrapper';
import { SignupForm } from '../../containers/SignupForm/SignupForm';
import styles from './SignupPage.module.scss';

export const SignupPage: React.FC = () => {
  return (
    <AuthWrapper>
      <div className={styles.signupAuthContainer}>
        <SignupForm />
      </div>
    </AuthWrapper>
  );
};
