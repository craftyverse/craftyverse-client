import React from 'react';
import { UpdatePasswordForm } from '../../containers/UpdatePasswordForm/UpdatePasswordForm';
import styles from './UpdatePasswordPage.module.scss';

export const UpdatePasswordPage: React.FC = () => {
  return (
    <div className={styles.updatePasswordPageContainer}>
      <UpdatePasswordForm />
    </div>
  );
};
