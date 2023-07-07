import { ReactNode } from 'react';
import styles from './AuthWrapper.module.scss';

export interface AuthWrapperProps {
  children: ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  return (
    <div data-testid="auth-wrapper-component" className={styles.authWrapperContainer}>
      <div className={styles.authLogoContainer}>
        <h1> Craftyverse</h1>
      </div>
      <div className={styles.authComponent}>{children}</div>
    </div>
  );
};
