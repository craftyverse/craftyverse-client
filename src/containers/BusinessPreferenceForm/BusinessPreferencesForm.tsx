import React from 'react';
import styles from './BusinessPreferenceForm.module.scss';
import { Input } from '../../components/Input';
import { Dropdown } from '../../components/Dropdown';

type BusinessPreferencesFormProps = {};

export const BusinessPreferencesForm: React.FC = () => {
  return (
    <div className={styles.businessPreferencesFormContainer}>
      <p className={styles.businessPreferencesFormTitle}>
        Now we would like to get your preferences on how we present your personalised dashboard.
      </p>
      <p className={styles.businessPreferencesFormText}>Please enter in your preferneces below.</p>

      <div className={styles.businessPreferencesFormSelection}>
        <Dropdown
          dropdownHeaderTitle={'Which industry is your business in?'}
          dropdownHeaderName={'industry'}
          dropdownOptionsArray={['crafts', 'paper crafts', 'jewellery', 'clothing', 'accessories']}
          onSelection={() => {
            return;
          }}
          selectionErrorMessage={''}
        />
      </div>
      <div className={styles.businessPreferenceFormUnits}>
        <Dropdown
          dropdownHeaderTitle={'What is your preferred currency to get paid?'}
          dropdownHeaderName={'Currency'}
          dropdownOptionsArray={['CNY', 'AUD', 'USD']}
          onSelection={() => {
            return;
          }}
          selectionErrorMessage={''}
        />
        <Dropdown
          dropdownHeaderTitle={'What is your preferred weight unit to be shown?'}
          dropdownHeaderName={'Unit'}
          dropdownOptionsArray={['Lbs', 'Kgs']}
          onSelection={() => {
            return;
          }}
          selectionErrorMessage={''}
        />
      </div>
    </div>
  );
};
