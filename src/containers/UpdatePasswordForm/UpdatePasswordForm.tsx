import React, { useState, useEffect } from 'react';
import { Modal } from '../../components/Modal';
import { Input } from '../../components/Input';
import styles from './UpdatePasswordForm.module.scss';
import { Button } from '../../components/Button';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export const UpdatePasswordForm: React.FC = () => {
  const authContext = useAuth();
  const navigate = useNavigate();
  const { userId } = useParams();

  const [userUpdatePasswordData, setUpdatePasswordData] = useState<{
    userId?: string;
    userEmail?: string;
    userPassword?: string;
  }>({
    userId: '',
    userEmail: '',
    userPassword: '',
  });

  const [isLoading, setLoading] = useState<boolean>(false);

  const [userPassword, setUserPassword] = useState<string>('');
  const [userConfirmPassword, setUserConfirmPassword] = useState<string>('');

  const [togglePasswordInputFocus, setTogglePasswordInputFocus] = useState<boolean>(false);
  const [toggleConfirmPasswordInputFocus, setToggleConfirmPasswordInputFocus] =
    useState<boolean>(false);

  const [passwordInputErrorMsg, setPasswordInputErrorMsg] = useState<string>('');
  const [confirmPasswordInputErrorMsg, setConfirmPasswordInputErrorMsg] = useState<string>('');

  const handleSubmitUpdatePassword = async () => {
    setLoading(true);

    if (userUpdatePasswordData['userPassword'] === '') {
      setPasswordInputErrorMsg('Please enter your password');
    }

    try {
      const response = await axios.post('/api/users/updatePassword', userUpdatePasswordData);
      if (response.status === 200 && response.data) {
        authContext?.setCurrentUser(response.data);
        const path = '/register-business-name';
        navigate(path);
      }
    } catch (error: any) {
      setConfirmPasswordInputErrorMsg(error.response.data.errors[0].message);
    }
  };

  const handlePasswordBlur = (event: any) => {
    setUserPassword(event.target.value);
    setTogglePasswordInputFocus(false);
  };

  const handleConfirmPasswordBlur = (event: any) => {
    setUserConfirmPassword(event.target.value);
    setToggleConfirmPasswordInputFocus(false);
  };

  const handlePasswordChange = () => {
    setPasswordInputErrorMsg('');
  };

  const handleConfirmPasswordChange = () => {
    setPasswordInputErrorMsg('');
  };

  const validateUserPassword = (input: string): void => {
    if (!input) {
      setPasswordInputErrorMsg('');
    }
  };

  const validateUserConfirmPassword = (input: string): void => {
    if (!input) {
      setConfirmPasswordInputErrorMsg('');
    }
  };

  useEffect(() => {
    validateUserPassword(userPassword);
    validateUserConfirmPassword(userConfirmPassword);
    setUpdatePasswordData({
      userId,
      userPassword: userPassword,
    });
  }, [userPassword, userConfirmPassword]);

  return (
    <div>
      <Modal
        openModal={true}
        title={'Create your new Password'}
        width="550px"
        height="550px"
        canClose={false}
      >
        <p className={styles.updatePasswordFormSubtitle}>
          Please enter your new password. Your password must be different to your previously
          registered password.
        </p>
        <Input
          type="password"
          labelName="Your New Password"
          onFocus={() => setTogglePasswordInputFocus(true)}
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          toggleInputFocus={togglePasswordInputFocus}
          inputErrorMessage={passwordInputErrorMsg}
        ></Input>
        <Input
          type="password"
          labelName="Confirm Your Password"
          onBlur={handleConfirmPasswordBlur}
          onFocus={() => setToggleConfirmPasswordInputFocus(true)}
          onChange={handleConfirmPasswordChange}
          toggleInputFocus={toggleConfirmPasswordInputFocus}
          inputErrorMessage={confirmPasswordInputErrorMsg}
        ></Input>
        <Button onClick={handleSubmitUpdatePassword} isLoading={isLoading}>
          <p>Reset Password</p>
        </Button>
      </Modal>
    </div>
  );
};
