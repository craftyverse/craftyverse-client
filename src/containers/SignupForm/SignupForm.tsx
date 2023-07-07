import React, { useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import styles from './SignupForm.module.scss';
import { Button } from '../../components/Button';

export const SignupForm = () => {
  const [userSigninData, setUserSigninData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isLoading, setLoading] = useState<boolean>(false);
  const [userFirstName, setUserFirstName] = useState<string>('');
  const [userLastName, setUserLastName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [userConfirmPassword, setUserConfirmPassword] = useState<string>('');

  const [firstNameInputErrorMsg, setFirstNameInputErrorMsg] = useState<string>('');
  const [lastNameInputErrorMsg, setLastNameInputErrorMsg] = useState<string>('');
  const [emailInputErrorMsg, setEmailInputErrorMsg] = useState<string>('');
  const [passwordInputErrorMsg, setPasswordInputErrorMsg] = useState<string>('');
  const [confirmPasswordInputErrorMsg, setConfirmPasswordInputErrorMsg] = useState<string>('');

  const [toggleFirstNameInputFocus, setToggleFirstNameInputFocus] = useState<boolean>(false);
  const [toggleLastNameInputFocus, setToggleLastNameInputFocus] = useState<boolean>(false);
  const [toggleEmailInputFocus, setToggleEmailInputFocus] = useState<boolean>(false);
  const [togglePasswordInputFocus, setTogglePasswordInputFocus] = useState<boolean>(false);
  const [toggleConfirmPasswordInputFocus, setToggleConfirmPasswordInputFocus] =
    useState<boolean>(false);

  const invalidEmailCharacters = /[!#$%&~\\]/g;
  const checkTrailingDot = /\.$/;

  const validateUserFirstName = (input: string): void => {
    if (!input) {
      setFirstNameInputErrorMsg('');
    } else if (input.length < 1) {
      setFirstNameInputErrorMsg('Please enter at least 1 character');
    } else {
      setEmailInputErrorMsg('');
    }
  };

  const validateUserLastName = (input: string): void => {
    if (!input) {
      setLastNameInputErrorMsg('');
    } else if (input.length < 1) {
      setLastNameInputErrorMsg('Please enter at least 1 character');
    } else {
      setLastNameInputErrorMsg('');
    }
  };

  const validateUserEmail = (input: string): void => {
    if (!input) {
      setEmailInputErrorMsg('');
    } else if (!input.includes('@')) {
      setEmailInputErrorMsg('Your email is missing the "@" symbol.');
    } else if (input.includes('@@')) {
      setEmailInputErrorMsg('Please remove one of the "@" in your email.');
    } else if (invalidEmailCharacters.test(input)) {
      setEmailInputErrorMsg(
        'Your email cannot contain these characters: "!", "#", "$", "%", "&", "~"'
      );
    } else if (checkTrailingDot.test(input)) {
      setEmailInputErrorMsg('Please remove the "." at the end of the email.');
    } else if (!input.split('@')[1]) {
      setEmailInputErrorMsg('Please provide a email domain like "gmail.com".');
    } else {
      setEmailInputErrorMsg('');
    }
  };

  const validateUserConfirmPassword = (input: string): void => {
    if (!input) {
      setConfirmPasswordInputErrorMsg('');
    }
  };

  const handleFirstNameBlur = (event: any) => {
    setUserFirstName(event.target.value);
    setToggleFirstNameInputFocus(false);
  };

  const handleFirstNameChange = () => {
    setFirstNameInputErrorMsg('');
  };

  const handleLastNameBlur = (event: any) => {
    setUserLastName(event.target.value);
    setToggleLastNameInputFocus(false);
  };

  const handleLastNameChange = () => {
    setLastNameInputErrorMsg('');
  };

  const handleEmailBlur = (event: any) => {
    setUserEmail(event.target.value);
    setToggleEmailInputFocus(false);
  };

  const handleEmailChange = () => {
    setEmailInputErrorMsg('');
  };

  const handlePasswordBlur = (event: any) => {
    setUserPassword(event.target.value);
    setTogglePasswordInputFocus(false);
  };

  const handlePasswordChange = () => {
    setPasswordInputErrorMsg('');
  };

  const handleConfirmPasswordBlur = (event: any) => {
    setUserConfirmPassword(event.target.value);
    setToggleConfirmPasswordInputFocus(false);
  };

  const handleConfirmPasswordChange = () => {
    setConfirmPasswordInputErrorMsg('');
  };

  const handleSubmit = () => {
    if (userSigninData['firstName'] === '') {
      setFirstNameInputErrorMsg('Please enter your first name');
    }

    if (userSigninData['lastName'] === '') {
      setLastNameInputErrorMsg('Please enter your last name.');
    }

    if (userSigninData['email'] === '') {
      setEmailInputErrorMsg('Please enter an email.');
    }

    if (userSigninData['password'] === '') {
      setPasswordInputErrorMsg('please enter a password.');
    }

    if (userSigninData['confirmPassword'] === '') {
      setConfirmPasswordInputErrorMsg('Please re-enter your password');
    }

    setLoading(false);
  };

  useEffect(() => {
    validateUserFirstName(userFirstName);
    validateUserLastName(userLastName);
    validateUserEmail(userEmail);
    validateUserConfirmPassword(userConfirmPassword);
    setUserSigninData({
      firstName: userFirstName,
      lastName: userLastName,
      email: userEmail,
      password: userPassword,
      confirmPassword: userConfirmPassword,
    });
  }, [userFirstName, userLastName, userEmail, userPassword, userConfirmPassword]);

  return (
    <div className={styles.signupFormContainer}>
      <div className={styles.signupFormInputContainer}>
        <h1 className={styles.signupFormHeading}>Create your Craftyverse account</h1>
        <div className={styles.signupNamesContainer}>
          <Input
            type="text"
            labelName="First name"
            onBlur={handleFirstNameBlur}
            onFocus={() => setToggleFirstNameInputFocus(true)}
            onChange={handleFirstNameChange}
            toggleInputFocus={toggleFirstNameInputFocus}
            inputErrorMessage={firstNameInputErrorMsg}
          ></Input>
          <Input
            type="text"
            labelName="Last name"
            onBlur={handleLastNameBlur}
            onFocus={() => setToggleLastNameInputFocus(true)}
            onChange={handleLastNameChange}
            toggleInputFocus={toggleLastNameInputFocus}
            inputErrorMessage={lastNameInputErrorMsg}
          ></Input>
        </div>
        <Input
          type="email"
          labelName="Email"
          onBlur={handleEmailBlur}
          onFocus={() => setToggleEmailInputFocus(true)}
          onChange={handleEmailChange}
          toggleInputFocus={toggleEmailInputFocus}
          inputErrorMessage={emailInputErrorMsg}
        ></Input>
        <Input
          type="password"
          labelName="Password"
          onBlur={handlePasswordBlur}
          onFocus={() => setTogglePasswordInputFocus(true)}
          onChange={handlePasswordChange}
          toggleInputFocus={togglePasswordInputFocus}
          inputErrorMessage={passwordInputErrorMsg}
        ></Input>
        <Input
          type="password"
          labelName="Confirm Password"
          onBlur={handleConfirmPasswordBlur}
          onFocus={() => setToggleConfirmPasswordInputFocus(true)}
          onChange={handleConfirmPasswordChange}
          toggleInputFocus={toggleConfirmPasswordInputFocus}
          inputErrorMessage={confirmPasswordInputErrorMsg}
        ></Input>
        <Button onClick={handleSubmit} isLoading={isLoading}>
          <p className={styles.buttonText}>Sign in</p>
        </Button>
      </div>
    </div>
  );
};
