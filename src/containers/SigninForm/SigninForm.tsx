import React, { FocusEventHandler, useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import styles from './SigninForm.module.scss';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';

export const SigninForm = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [emailInputErrorMsg, setEmailInputErrorMsg] = useState<string>('');
  const [toggleEmailInputFocus, setToggleEmailInputFocus] = useState<boolean>(false);
  const [togglePasswordInputFocus, setTogglePasswordEmailInputFocus] = useState<boolean>(false);

  const invalidEmailCharacters = /[!#$%&~\\]/g;
  const checkTrailingDot = /\.$/;

  const validateEmail = (input: string): void => {
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

  const handleEmailBlur = (event: any) => {
    setUserEmail(event.target.value);
    setToggleEmailInputFocus(false);
  };

  useEffect(() => {
    validateEmail(userEmail);
  }, [userEmail]);

  return (
    <div className={styles.signinFormContainer}>
      <div className={styles.signinFormInputContainer}>
        <h1 className={styles.signinFormHeading}>Login to your account</h1>
        <Input
          type="email"
          labelName="Your Email"
          inputErrorMessage={emailInputErrorMsg}
          onFocus={() => setToggleEmailInputFocus(true)}
          onBlur={handleEmailBlur}
          toggleInputFocus={toggleEmailInputFocus}
        />
        <Input
          type="password"
          labelName="Your Password"
          onFocus={() => setTogglePasswordEmailInputFocus(true)}
          onBlur={() => setTogglePasswordEmailInputFocus(false)}
          toggleInputFocus={togglePasswordInputFocus}
        />
        <div className={styles.signinUtilities}>
          <div className={styles.signinRememberContainer}>
            <input type="checkbox"></input>
            <label>Remember me</label>
          </div>
          <p>Forgot Password?</p>
        </div>
        <Button>
          <p>Sign in</p>
        </Button>
        <p className={styles.signupCta}>
          Already have an account? <Link to="/signup">Get started</Link>
        </p>
      </div>
    </div>
  );
};
