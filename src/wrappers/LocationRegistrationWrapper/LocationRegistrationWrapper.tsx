import React, { ReactNode, useEffect, useState } from 'react';
import styles from './LocationRegistrationWrapper.module.scss';
import { Button } from '../../components/Button';

export interface LocationRegistrationWrapperProps {
  locationData: Record<string, unknown>;
  children: ReactNode;
}

export const LocationRegistrationWrapper = ({
  locationData,
  children,
}: LocationRegistrationWrapperProps) => {
  const [fullLocationData, setLocationData] = useState<Record<string, unknown>>({});
  const [businessNameDataErrorMsg, setBusinessNameDataErrorMsg] = useState<string>('');

  const handleSubmit = () => {
    if (!locationData['businessName']) {
      setBusinessNameDataErrorMsg('Please enter your business name');
    } else {
      setBusinessNameDataErrorMsg('');
    }
  };

  useEffect(() => {
    if (locationData['businessName']) {
      setBusinessNameDataErrorMsg('');
    }
  }, [locationData]);

  return (
    <div
      data-testid="location-registration-wrapper"
      className={styles.locationRegistrationWrapperContainer}
    >
      <div className={styles.logoContainer}>
        <h1> Craftyverse</h1>
      </div>
      {children}

      <div className={styles.ctaContainer}>
        <div className={styles.ctaBtn}>
          <Button type="secondary">Back</Button>
          <Button type="primary" onClick={handleSubmit}>
            Next
          </Button>
        </div>
        <span className={styles.inputErrorMsg}>{businessNameDataErrorMsg}</span>
      </div>
    </div>
  );
};
