import React, { useState } from 'react';
import styles from './Input.module.scss';
import iconSet from '../../icons/selection.json';
import IcomoonReact from 'icomoon-react';

export interface inputProps {
  type: 'text' | 'email' | 'password' | 'checkbox';
  labelName: string;
}

const renderInputIcons = (type: string, labelName: string) => {
  if (type === 'email') {
    return <IcomoonReact iconSet={iconSet} icon="email-outline" size={24} color="#000000" />;
  }

  if (type === 'password') {
    return <IcomoonReact iconSet={iconSet} icon="lock-outline" size={24} color="#000000" />;
  }

  if (type === 'text' && labelName.includes('Name')) {
    return <IcomoonReact iconSet={iconSet} icon="user-outline" size={24} color="#000000" />;
  }
};

export const Input: React.FC<inputProps> = ({ type, labelName }) => {
  const [toggleShowPassword, setToggleShowPassword] = useState<boolean>(false);
  const [toggleInputFocus, setToggleInputFocus] = useState<boolean>(false);

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
      <label htmlFor={labelName}>{labelName}</label>
      <div className={`${toggleInputFocus && styles.activeInputElement} ${styles.inputElement}`}>
        {renderInputIcons(type, labelName)}
        {toggleShowPassword && type === 'password' ? (
          <input
            type="text"
            name={labelName}
            placeholder={labelName}
            onFocus={() => setToggleInputFocus(true)}
            onBlur={() => setToggleInputFocus(false)}
          ></input>
        ) : (
          <input
            type={type}
            name={labelName}
            placeholder={labelName}
            onFocus={() => setToggleInputFocus(true)}
            onBlur={() => setToggleInputFocus(false)}
          ></input>
        )}
        <div className={styles.eyeIcon}>
          {labelName.includes('Password') && renderPasswordIconToggle()}
        </div>
      </div>
    </div>
  );
};
