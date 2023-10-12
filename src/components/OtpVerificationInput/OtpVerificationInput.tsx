import React, { useMemo, useState } from 'react';
import styles from './OtpVerificationInput.module.scss';

export interface OtpVerificationInputProps {
  code: string;
  codeLength: number;
  onOtpInputChange: (value: string) => void;
  otpInputErrorMsg: string;
}

const digitRegEx = new RegExp(/^\d+$/);

export const OtpVerificationInput: React.FC<OtpVerificationInputProps> = ({
  codeLength,
  code,
  onOtpInputChange,
  otpInputErrorMsg,
}) => {
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const target = event.target;
    let targetValue = target.value;
    const isTargetValueDigit = digitRegEx.test(targetValue);

    if (!isTargetValueDigit && targetValue !== '') {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : ' ';

    const newValue = code.substring(0, idx) + targetValue + code.substring(idx + 1);

    onOtpInputChange(newValue);

    if (!isTargetValueDigit) {
      return;
    }

    const nextElementSibling = target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (event.key !== 'Backspace' || target.value !== '') {
      return;
    }

    const previousElementSibling = target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
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
    <div className={styles.otpVerificationContainer}>
      <div className={styles.otpVerificationInput}>
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
            onKeyDown={(event) => onInputKeyDown(event)}
            value={digit}
          />
        ))}
      </div>
      <p className={styles.otpInputErrorMsg}>{otpInputErrorMsg}</p>
    </div>
  );
};
