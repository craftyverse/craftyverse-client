import React from 'react';
import { SigninForm } from '../../containers/SigninForm';
import { AuthWrapper } from '../../wrappers/AuthWrapper';
import styles from './SigninPage.module.scss';

export const SigninPage: React.FC = () => {
  return (
    <AuthWrapper>
      <div className={styles.authContainer}>
        <SigninForm />
      </div>
    </AuthWrapper>
  );
};
