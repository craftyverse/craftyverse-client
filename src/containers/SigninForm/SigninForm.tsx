import React, { useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import styles from './SigninForm.module.scss';
import { Button } from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const SigninForm = () => {
  const navigate = useNavigate();
  const [userSigninData, setUserSigninData] = useState<{
    userEmail: string;
    userPassword: string;
  }>({
    userEmail: '',
    userPassword: '',
  });
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const [emailInputErrorMsg, setEmailInputErrorMsg] = useState<string>('');
  const [passwordInputErrorMsg, setPasswordInputErrorMsg] = useState<string>('');

  const [isLoading, setLoading] = useState<boolean>(false);

  const [toggleEmailInputFocus, setToggleEmailInputFocus] = useState<boolean>(false);
  const [togglePasswordInputFocus, setTogglePasswordInputFocus] = useState<boolean>(false);

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

  const handleEmailChange = () => {
    setEmailInputErrorMsg('');
  };

  const handlePasswordChange = () => {
    setPasswordInputErrorMsg('');
  };

  const handlePasswordBlur = (event: any) => {
    setUserPassword(event.target.value);
    setTogglePasswordInputFocus(false);
  };

  const handleSubmit = async () => {
    if (userSigninData['userEmail'] === '') {
      setEmailInputErrorMsg('Please enter an email.');
    }

    if (userSigninData['userPassword'] === '') {
      setPasswordInputErrorMsg('please enter a password.');
    }

    // call backend
    try {
      await axios.post('/api/users/signin', userSigninData);
      const path = '/onboarding';
      navigate(path);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    validateEmail(userEmail);
    setUserSigninData({
      userEmail: userEmail,
      userPassword: userPassword,
    });
  }, [userEmail, userPassword]);

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
          onChange={handleEmailChange}
          toggleInputFocus={toggleEmailInputFocus}
        />
        <Input
          type="password"
          labelName="Your Password"
          onFocus={() => setTogglePasswordInputFocus(true)}
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          toggleInputFocus={togglePasswordInputFocus}
          inputErrorMessage={passwordInputErrorMsg}
        />
        <div className={styles.signinUtilities}>
          <div className={styles.signinRememberContainer}>
            <input type="checkbox"></input>
            <label>Remember me</label>
          </div>
          <p>Forgot Password?</p>
        </div>
        <Button onClick={handleSubmit} isLoading={isLoading}>
          <p className={styles.buttonText}>Sign in</p>
        </Button>
        <p className={styles.signupCta}>
          Don't have an account?{' '}
          <Link className={styles.signupLinkCta} to="/signup">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};
