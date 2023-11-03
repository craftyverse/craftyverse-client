import React, { FocusEventHandler, useEffect, useState } from 'react';
import styles from './Dropdown.module.scss';
import IcomoonReact from 'icomoon-react';
import iconSet from '../../icons/selection.json';

type DropdownProps = {
  dropdownHeaderTitle: string;
  dropdownHeaderName: string;
  dropdownOptionsArray: string[];
  onSelection: (selection: string) => void;
  selectionErrorMessage: string;
};

const renderDropdownIcon = (isActive: boolean) => {
  if (isActive) {
    return <IcomoonReact iconSet={iconSet} icon="up-arrow" size={24} color="#000000" />;
  } else {
    return <IcomoonReact iconSet={iconSet} icon="down-arrow" size={24} color="#000000" />;
  }
};

export const Dropdown: React.FC<DropdownProps> = ({
  dropdownOptionsArray,
  dropdownHeaderName,
  dropdownHeaderTitle,
  onSelection,
  selectionErrorMessage,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(dropdownOptionsArray[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onSelect = () => {
    onSelection(selectedOption);
  };

  useEffect(() => {
    if (selectedOption) {
      onSelect();
    }
  }, [selectedOption]);

  return (
    <div data-testid="dropdown-component" className={styles.dropdownContainer}>
      <label htmlFor={dropdownHeaderTitle} className={styles.dropdownHeaderTitle}>
        {dropdownHeaderTitle}
      </label>
      <div
        className={`${styles.dropdownHeader} ${isOpen && styles.dropdownActive} ${
          selectionErrorMessage && styles.dropdownError
        }`}
        onClick={toggleDropdown}
      >
        <span>{selectedOption}</span>
        <div>{renderDropdownIcon(isOpen)}</div>
      </div>
      <p className={styles.selectionErrorMsg}>{selectionErrorMessage}</p>
      {isOpen && (
        <ul className={styles.dropdownListContainer}>
          {dropdownOptionsArray.map((option) => (
            <li
              key={option}
              className={styles.dropdownListItem}
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
                onSelect();
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
