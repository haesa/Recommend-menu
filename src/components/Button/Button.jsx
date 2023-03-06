import React from 'react';
import styles from './Button.module.css';

export default function Button({ text, handleClick }) {
  return (
    <button className={styles.button} onClick={handleClick}>
      {text}
    </button>
  );
}
