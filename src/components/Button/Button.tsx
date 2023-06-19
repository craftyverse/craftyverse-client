import React from 'react';

interface ButtonProps {
  buttonText: string;
}

export const Button: React.FC<ButtonProps> = ({ buttonText }) => {
  return (
    <div>
      <h1>Button</h1>
    </div>
  );
};
