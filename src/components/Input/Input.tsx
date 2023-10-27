import React, { FocusEventHandler, useState } from 'react';
import styles from './Input.module.scss';
import iconSet from '../../icons/selection.json';
import IcomoonReact from 'icomoon-react';

export interface inputProps {
  type: 'text' | 'email' | 'password' | 'checkbox';
  labelName: string;
  placeholderName?: string;
  inputErrorMessage?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onChange?: FocusEventHandler<HTMLInputElement>;
  toggleInputFocus?: boolean;
  value?: string;
}

const renderInputIcons = (type: string, labelName: string) => {
  if (type === 'email') {
    return <IcomoonReact iconSet={iconSet} icon="email-outline" size={24} color="#000000" />;
  }

  if (type === 'password') {
    return <IcomoonReact iconSet={iconSet} icon="lock-outline" size={24} color="#000000" />;
  }

  if (type === 'text' && labelName.includes('First') && labelName.includes('Last')) {
    return <IcomoonReact iconSet={iconSet} icon="user-outline" size={24} color="#000000" />;
  }
};

export const Input: React.FC<inputProps> = ({
  type,
  labelName,
  inputErrorMessage,
  placeholderName,
  onBlur,
  onFocus,
  onChange,
  toggleInputFocus,
  value,
}) => {
  const [toggleShowPassword, setToggleShowPassword] = useState<boolean>(false);

  const handleTogglePassword = () => {
    setToggleShowPassword(!toggleShowPassword);
  };

  const renderPasswordIconToggle = (): React.ReactNode => {
    return (
      <button onClick={handleTogglePassword}>
        {!toggleShowPassword ? (
          <IcomoonReact
            className={styles.eyehideIcon}
            iconSet={iconSet}
            icon="eye-hide"
            size={24}
            color="#000000"
          />
        ) : (
          <IcomoonReact
            className={styles.eyehideIcon}
            iconSet={iconSet}
            icon="eye"
            size={24}
            color="#000000"
          />
        )}
      </button>
    );
  };

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={labelName} className={styles.inputLabelName}>
        {labelName}
      </label>
      <div
        className={`${toggleInputFocus && styles.activeInputElement} ${styles.inputElement} ${
          inputErrorMessage && styles.errorInputElement
        }`}
      >
        {renderInputIcons(type, labelName)}
        {toggleShowPassword && type === 'password' ? (
          <input
            type="text"
            name={labelName}
            placeholder={placeholderName}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
          />
        ) : (
          <input
            type={type}
            name={labelName}
            placeholder={placeholderName}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
          />
        )}
        <div className={styles.eyeIcon}>
          {labelName.includes('Password') && renderPasswordIconToggle()}
        </div>
      </div>
      <p className={styles.inputErrorMsg}>{inputErrorMessage}</p>
    </div>
  );
};
