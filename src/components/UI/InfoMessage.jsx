import React from 'react';
import styles from '../../styles/InfoMessage.module.css';

const InfoMessage = ({ icon, message }) => {
  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        <span className={styles.icon}>{icon}</span>
        <p className={styles.text}>{message}</p>
      </div>
    </div>
    
  );
};

export default InfoMessage;