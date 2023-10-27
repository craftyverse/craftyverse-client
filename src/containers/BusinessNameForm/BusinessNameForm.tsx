import React, { useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import styles from './BusinessNameForm.module.scss';

type BusinessNameFormDataType = {
  locationName: string;
};

type BusinessNameFormProps = BusinessNameFormDataType & {
  userName: string;
  inputErrorMsg: string;
  updateLocationData: (fields: Partial<BusinessNameFormDataType>) => void;
};

export const BusinessNameForm: React.FC<BusinessNameFormProps> = ({
  userName,
  inputErrorMsg,
  locationName,
  updateLocationData,
}) => {
  const [toggleBusinessNameInputFocus, setToggleBusinessNameInputFocus] = useState<boolean>(false);
  const [businessNameErrorMsg, setBusinessNameErrorMsg] = useState<string>('');

  const handleBusinessNameBlur = (event: any) => {
    updateLocationData({ locationName: event.target.value });
    setBusinessNameErrorMsg(inputErrorMsg);
    if (businessNameErrorMsg) {
      setToggleBusinessNameInputFocus(true);
    } else {
      setToggleBusinessNameInputFocus(false);
    }
  };

  const handleBusinessNameChange = (event: any) => {
    updateLocationData({ locationName: event.target.value });
    setBusinessNameErrorMsg('');

    if (locationName) {
      setToggleBusinessNameInputFocus(true);
    } else {
      setToggleBusinessNameInputFocus(false);
    }
  };

  useEffect(() => {
    if (!locationName) {
      setBusinessNameErrorMsg(inputErrorMsg);
    }
  }, [locationName]);

  return (
    <div className={styles.businessNameFormContainer}>
      <p>
        We are very excited to have you here {userName}! Let's start off by telling us your business
        name.
      </p>
      <Input
        type={'text'}
        labelName={'Your Business Name'}
        placeholderName="Business Name"
        onBlur={handleBusinessNameBlur}
        onChange={handleBusinessNameChange}
        toggleInputFocus={toggleBusinessNameInputFocus}
        inputErrorMessage={businessNameErrorMsg}
        value={locationName}
      ></Input>
    </div>
  );
};
