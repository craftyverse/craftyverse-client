import React from 'react';
import styles from './ProgressBar.module.scss';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progressStage: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progressStage }) => {
  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar}>
        <motion.div
          className={styles.bar}
          animate={{
            width: progressStage,
          }}
          transition={{ duration: 2 }}
        ></motion.div>
      </div>
    </div>
  );
};
