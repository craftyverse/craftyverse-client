import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import styles from './Modal.module.scss';
import IcomoonReact from 'icomoon-react';
import iconSet from '../../icons/selection.json';

export interface ModalProps {
  openModal: boolean;
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
  title: string;
  children: ReactNode;
  width: string;
  height: string;
  canClose: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  openModal,
  setOpenModal,
  title,
  children,
  width,
  height,
  canClose,
}) => {
  const handleClick = () => {
    if (setOpenModal) {
      setOpenModal((prev) => !prev);
    }
  };
  return (
    <>
      {openModal ? (
        <div className={styles.modalContainer}>
          <div className={styles.modalWrapper} style={{ width: width, height: height }}>
            <h1 className={styles.modalLogo}>Craftyverse</h1>
            {canClose && (
              <button className={styles.modalCloseIcon} onClick={handleClick}>
                <IcomoonReact
                  className={styles.closeIcon}
                  iconSet={iconSet}
                  icon="close"
                  size={24}
                  color="#000000"
                />
              </button>
            )}
            <p className={styles.modalTitle}>{title}</p>
            <div>{children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};
