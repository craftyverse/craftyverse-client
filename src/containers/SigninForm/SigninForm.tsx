import React, { useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import styles from './SigninForm.module.scss';
import { Button } from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal } from '../../components/Modal';
import { OtpVerificationInput } from '../../components/OtpVerificationInput';
import useAuth from '../../hooks/useAuth';

const maskEmail = (email: string) => {
  return email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, '$1****@$2');
};

export const SigninForm = () => {
  const setCurrentUser = useAuth();
  const navigate = useNavigate();
  const [userSigninData, setUserSigninData] = useState<{
    userEmail: string;
    userPassword: string;
  }>({
    userEmail: '',
    userPassword: '',
  });

  const [submitResetPasswordEmailData, setSubmitResetPasswordData] = useState<{
    userEmail: string;
  }>({
    userEmail: '',
  });

  const [submitOtpCodeData, setSubmitOtpCodeData] = useState<{
    userEmail: string;
    otpString: string;
  }>({
    userEmail: '',
    otpString: '',
  });

  // User input useStates
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [userResetPasswordEmail, setUserResetPasswordEmail] = useState<string>('');
  const [userOtp, setUserOtp] = useState<string>('');

  // Input error message useStates
  const [emailInputErrorMsg, setEmailInputErrorMsg] = useState<string>('');
  const [passwordInputErrorMsg, setPasswordInputErrorMsg] = useState<string>('');
  const [resetPasswordEmailErrorMsg, setResetPasswordEmailErrorMsg] = useState<string>('');
  const [otpInputVerifyErrorMsg, setOtpInputVerifyErrorMsg] = useState<string>('');

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isModalLoading, setModalLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openVerifyOtpModal, setOpenVerifyOtpModal] = useState<boolean>(false);

  const [toggleEmailInputFocus, setToggleEmailInputFocus] = useState<boolean>(false);
  const [togglePasswordInputFocus, setTogglePasswordInputFocus] = useState<boolean>(false);
  const [toggleResetPasswordEmailFocus, setToggleResetPasswordEmailFocus] =
    useState<boolean>(false);

  const invalidEmailCharacters = /[!#$%&~\\]/g;
  const checkTrailingDot = /\.$/;

  const validateEmail = (input: string): void => {
    if (!input) {
      setEmailInputErrorMsg('');
      setResetPasswordEmailErrorMsg('');
    } else if (!input.includes('@')) {
      setEmailInputErrorMsg('Your email is missing the "@" symbol.');
      setResetPasswordEmailErrorMsg('Your email is missing the "@" symbol.');
    } else if (input.includes('@@')) {
      setEmailInputErrorMsg('Please remove one of the "@" in your email.');
      setResetPasswordEmailErrorMsg('Please remove one of the "@" in your email.');
    } else if (invalidEmailCharacters.test(input)) {
      setEmailInputErrorMsg(
        'Your email cannot contain these characters: "!", "#", "$", "%", "&", "~"'
      );
      setResetPasswordEmailErrorMsg(
        'Your email cannot contain these characters: "!", "#", "$", "%", "&", "~"'
      );
    } else if (checkTrailingDot.test(input)) {
      setEmailInputErrorMsg('Please remove the "." at the end of the email.');
      setResetPasswordEmailErrorMsg('Please remove the "." at the end of the email.');
    } else if (!input.split('@')[1]) {
      setEmailInputErrorMsg('Please provide a email domain like "gmail.com".');
      setResetPasswordEmailErrorMsg('Please provide a email domain like "gmail.com".');
    } else {
      setEmailInputErrorMsg('');
      setResetPasswordEmailErrorMsg('');
    }
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

  const handleResetPasswordEmailBlur = (event: any) => {
    setUserResetPasswordEmail(event.target.value);
    setToggleResetPasswordEmailFocus(false);
  };

  const handleResetPasswordEmailChange = () => {
    setResetPasswordEmailErrorMsg('');
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
      const currentUser = await axios.post('/api/users/signin', userSigninData);

      if (currentUser.data) {
        setCurrentUser?.setCurrentUser(currentUser.data);
      }

      const path = '/register-business-name';
      navigate(path);
    } catch (error: any) {
      setPasswordInputErrorMsg(error.response.data.errors[0].message);
    }

    setLoading(false);
  };

  const handlePasswordResetEmail = async () => {
    setModalLoading(true);
    if (submitResetPasswordEmailData['userEmail'] === '') {
      setResetPasswordEmailErrorMsg(
        'Please enter your email so we can send you a OTP for you to reset your password'
      );
    }

    try {
      const response = await axios.post('/api/users/forgotPassword', submitResetPasswordEmailData);
      if (response.status === 200) {
        setOpenVerifyOtpModal(true);
        setOpenModal(false);
      }
    } catch (error: any) {
      setResetPasswordEmailErrorMsg(error.response.data.errors[0].message);
    }
    setModalLoading(false);
  };

  const handleSubmitVerifyOtpCode = async () => {
    setModalLoading(true);

    if (submitOtpCodeData['otpString'] === '') {
      setOtpInputVerifyErrorMsg('Please enter your OTP code that we have sent to your email.');
    }

    try {
      const response = await axios.post('/api/users/verifyOtp', submitOtpCodeData);
      if (response.status === 200) {
        const responseData = response.data;
        const path = `/updatePassword/${responseData.userId}`;
        navigate(path);
      }
    } catch (error: any) {
      setOtpInputVerifyErrorMsg(error.response.data.errors[0].message);
    }

    setModalLoading(false);
  };

  // This handler is to open / close the modal
  const showModal = () => {
    setOpenModal(true);
    setResetPasswordEmailErrorMsg('');
    setOtpInputVerifyErrorMsg('');
    setUserOtp('');
  };

  const handleOnOtpInputChange = (value: string) => {
    setUserOtp(value);
  };

  useEffect(() => {
    validateEmail(userEmail);
    setUserSigninData({
      userEmail: userEmail,
      userPassword: userPassword,
    });
  }, [userEmail, userPassword]);

  useEffect(() => {
    validateEmail(userResetPasswordEmail);
    setSubmitResetPasswordData({
      userEmail: userResetPasswordEmail,
    });
  }, [userResetPasswordEmail]);

  useEffect(() => {
    setSubmitOtpCodeData({
      userEmail: userResetPasswordEmail,
      otpString: userOtp,
    });
  }, [userOtp, userResetPasswordEmail]);

  return (
    <div className={styles.signinFormContainer}>
      <div className={styles.signinFormInputContainer}>
        <h1 className={styles.signinFormHeading}>Login to your account</h1>
        <Input
          type="email"
          labelName="Your Email"
          placeholderName="Your Email"
          inputErrorMessage={emailInputErrorMsg}
          onFocus={() => setToggleEmailInputFocus(true)}
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          toggleInputFocus={toggleEmailInputFocus}
        />
        <Input
          type="password"
          labelName="Your Password"
          placeholderName="Your Password"
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
          <Link className={styles.forgotPasswordCta} onClick={showModal} to={''}>
            Forgot Password?
          </Link>
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
        {openModal && (
          <Modal
            openModal={openModal}
            setOpenModal={setOpenModal}
            title="Reset your password"
            width="500px"
            height="500px"
            canClose={true}
          >
            <p style={{ paddingBottom: '24px', color: '#718096' }}>
              Enter the email address associated with your account and we'll send you a link to
              reset your password.
            </p>
            <Input
              onFocus={() => setToggleResetPasswordEmailFocus(true)}
              onBlur={handleResetPasswordEmailBlur}
              onChange={handleResetPasswordEmailChange}
              toggleInputFocus={toggleResetPasswordEmailFocus}
              inputErrorMessage={resetPasswordEmailErrorMsg}
              type={'email'}
              labelName={'Your Email'}
            ></Input>
            <Button onClick={handlePasswordResetEmail} isLoading={isModalLoading}>
              <p>Verify</p>
            </Button>
          </Modal>
        )}
        {openVerifyOtpModal && !openModal && (
          <Modal
            openModal={openVerifyOtpModal}
            setOpenModal={setOpenVerifyOtpModal}
            title="Enter verification code"
            width="500px"
            height="500px"
            canClose={true}
          >
            <p style={{ paddingBottom: '24px', color: '#718096' }}>
              We have just sent a verification code to {maskEmail(userResetPasswordEmail)}
            </p>
            <OtpVerificationInput
              codeLength={6}
              code={userOtp}
              onOtpInputChange={handleOnOtpInputChange}
              otpInputErrorMsg={otpInputVerifyErrorMsg}
            />
            <Button onClick={handleSubmitVerifyOtpCode} isLoading={isModalLoading}>
              <p>Verify</p>
            </Button>
          </Modal>
        )}
      </div>
    </div>
  );
};
