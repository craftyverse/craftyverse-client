import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import styles from './LocationSignupPage.module.scss';
import { BusinessNameForm } from '../../containers/BusinessNameForm';

export const LocationSignupPage: React.FC = () => {
  const authenticatedUser = useAuth();

  return (
    <div className={styles.locationSignupContainer}>
      <BusinessNameForm userName={`${authenticatedUser?.currentUser?.userFirstName}`} />
    </div>
  );
};
