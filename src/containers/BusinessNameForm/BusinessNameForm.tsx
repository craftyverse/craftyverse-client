import React, { useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import styles from './BusinessNameForm.module.scss';

interface BusinessNameFormProps {
  userName: string;
  inputErrorMsg: string;
  setBusinessNameInput: (businessName: string) => void;
}

export const BusinessNameForm: React.FC<BusinessNameFormProps> = ({
  userName,
  inputErrorMsg,
  setBusinessNameInput,
}) => {
  const [toggleBusinessNameInputFocus, setToggleBusinessNameInputFocus] = useState<boolean>(false);

  const handleBusinessNameBlur = (event: any) => {
    setBusinessNameInput(event.target.value);
    setToggleBusinessNameInputFocus(false);
  };

  return (
    <div className={styles.businessNameFormContainer}>
      <p>
        We are very excited to have you here {userName}! Let's start off by telling us your business
        name.
      </p>
      <Input
        type={'text'}
        labelName={'Your Business Name'}
        onBlur={handleBusinessNameBlur}
        toggleInputFocus={toggleBusinessNameInputFocus}
        inputErrorMessage={inputErrorMsg}
      ></Input>
    </div>
  );
};
