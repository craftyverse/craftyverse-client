import React, { useEffect, useState } from 'react';
import styles from './BusinessNameForm.module.scss';
import { LocationRegistrationWrapper } from '../../wrappers/LocationRegistrationWrapper';
import { Input } from '../../components/Input';

interface BusinessNameFormProps {
  userName: string;
}
export const BusinessNameForm: React.FC<BusinessNameFormProps> = ({
  userName,
}: BusinessNameFormProps) => {
  const [businessName, setBusinessName] = useState<string>('');
  const [toggleBusinessNameInputFocus, setToggleBusinessNameInputFocus] = useState<boolean>(false);
  const [businessNameInputErrormsg, setBussinessNameInputErrorMsg] = useState<string>('');

  const validateBusinessNameInput = (input: string): void => {
    if (!input) {
      setBussinessNameInputErrorMsg('');
    } else if (input.length === 0) {
      setBussinessNameInputErrorMsg('Please enter your business name');
    }
  };

  const handleBusinessNameBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setBusinessName(event.target.value);
    setToggleBusinessNameInputFocus(false);
  };

  useEffect(() => {
    validateBusinessNameInput(businessName);
  }, [businessName]);

  return (
    <LocationRegistrationWrapper locationData={{ businessName }}>
      <p className={styles.businessNameContainer}>
        We are very excited to have you here {userName}! Let's start off by telling us your business
        name.
      </p>
      <Input
        type="text"
        labelName="Your business name"
        inputErrorMessage={businessNameInputErrormsg}
        onBlur={handleBusinessNameBlur}
        onFocus={() => setToggleBusinessNameInputFocus(true)}
        toggleInputFocus={toggleBusinessNameInputFocus}
      ></Input>
    </LocationRegistrationWrapper>
  );
};
