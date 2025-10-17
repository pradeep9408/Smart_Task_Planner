import React from 'react';
import styles from './Dropdown.module.css';

const Dropdown = ({ id, options, selectedValue, onChange, disabled = false, required = false }) => {
  return (
    <select
      id={id}
      className={styles.dropdown}
      value={selectedValue}
      onChange={onChange}
      disabled={disabled}
      required={required}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;