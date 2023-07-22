import React, { useMemo, useState } from 'react';
import styles from './OtpVerificationInput.module.scss';

export interface OtpVerificationInputProps {
  code: string;
  codeLength: number;
  onOtpInputChange: (value: string) => void;
}

const digitRegEx = new RegExp(/^\d+$/);

export const OtpVerificationInput: React.FC<OtpVerificationInputProps> = ({
  codeLength,
  code,
  onOtpInputChange,
}) => {
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const target = event.target;
    const targetValue = target.value;

    if (!digitRegEx.test(targetValue)) {
      return;
    }

    const newValue = code.substring(0, idx) + targetValue + code.substring(idx + 1);

    onOtpInputChange(newValue);
  };

  const optCodeValueItems = useMemo<string[]>(() => {
    const otpCodeArray = code.split('');
    const codeDigitsArray: Array<string> = [];

    for (let i = 0; i < codeLength; i++) {
      const digit = otpCodeArray[i];

      if (digitRegEx.test(digit)) {
        codeDigitsArray.push(digit);
      } else {
        codeDigitsArray.push('');
      }
    }
    return codeDigitsArray;
  }, [code, codeLength]);

  return (
    <div className={styles.otpVerificationInputContainer}>
      {optCodeValueItems.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={codeLength}
          className={styles.otpBox}
          onChange={(event) => onInputChange(event, idx)}
          value={digit}
        />
      ))}
    </div>
  );
};
