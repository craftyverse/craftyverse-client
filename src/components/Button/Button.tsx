import React, { MouseEventHandler, ReactNode } from 'react';
import styles from './Button.module.scss';
import { Spinner } from '../Spinner/Spinner';

export interface ButtonProps {
  type?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  fullWidth?: boolean;
  className?: boolean;
  ariaLabel?: boolean;
  dataTestId?: string;
  isLoading?: boolean;
}
export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'primary',
  fullWidth = false,
  className = '',
  ariaLabel,
  dataTestId,
  isLoading,
  onClick,
}) => {
  return (
    <button
      data-testid={dataTestId}
      className={`${type === 'primary' && styles.primaryButton} ${
        type === 'secondary' && styles.secondaryButton
      }`}
      onClick={onClick}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};
