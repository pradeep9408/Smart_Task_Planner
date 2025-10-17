import React from 'react';
import styles from './ToggleSwitch.module.css';

const ToggleSwitch = ({ id, label, checked, onChange, disabled = false, description = '' }) => {
  return (
    <div className={`${styles.toggleContainer} ${styles.noHoverEffect}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {description && <span className={styles.description}>{description}</span>}
      </label>
      <input
        type="checkbox"
        id={id}
        className={styles.checkbox}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={id} className={styles.switch}></label>
    </div>
  );
};

export default ToggleSwitch;