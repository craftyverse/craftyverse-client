import React from 'react';
import styles from './Spinner.module.scss';

export interface SpinnerProps {
  color?: 'white';
}

export const Spinner: React.FC<SpinnerProps> = ({ color = 'white' }): JSX.Element => {
  return (
    <div data-testid="loading-spinner" className={`${styles.loaderSpinner} ${styles[color]}`}></div>
  );
};
