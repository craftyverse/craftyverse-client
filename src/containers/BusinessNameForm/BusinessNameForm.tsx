import React, { useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import styles from './BusinessNameForm.module.scss';

type BusinessNameFormDataType = {
  locationName: string;
};

type BusinessNameFormProps = BusinessNameFormDataType & {
  userName: string;
  locationNameErrorMsg: string;
  updateLocationData: (fields: Partial<BusinessNameFormDataType>) => void;
};

export const BusinessNameForm: React.FC<BusinessNameFormProps> = ({ userName, locationNameErrorMsg, locationName, updateLocationData }) => {
  const [toggleBusinessNameInputFocus, setToggleBusinessNameInputFocus] = useState<boolean>(false);
  const [businessNameErrorMsg, setBusinessNameErrorMsg] = useState<string>('');

  const handleBusinessNameBlur = (event: any) => {
    updateLocationData({ locationName: event.target.value });
    validateBusinessNameErrorMsg(locationName);
    setToggleBusinessNameInputFocus(false);
  };

  const handleBusinessNameChange = (event: any) => {
    updateLocationData({ locationName: event.target.value });
    setBusinessNameErrorMsg('');
  };

  const validateBusinessNameErrorMsg = (businessNameInput: string) => {
    if (!businessNameInput) {
      setBusinessNameErrorMsg('Please enter a business name.');
    } else if (businessNameInput.length < 3) {
      setBusinessNameErrorMsg('Business name must be at least 3 characters.');
    } else if (locationNameErrorMsg) {
      setBusinessNameErrorMsg(locationNameErrorMsg);
    }
  };

  return (
    <div className={styles.businessNameFormContainer}>
      <p>We are very excited to have you here {userName}! Let's start off by telling us your business name.</p>
      <Input
        type={'text'}
        labelName={'Your Business Name'}
        placeholderName="Business Name"
        onBlur={handleBusinessNameBlur}
        onChange={handleBusinessNameChange}
        onFocus={() => {
          setToggleBusinessNameInputFocus(true);
        }}
        toggleInputFocus={toggleBusinessNameInputFocus}
        inputErrorMessage={businessNameErrorMsg}
        value={locationName}
      ></Input>
    </div>
  );
};
