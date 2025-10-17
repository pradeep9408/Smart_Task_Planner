import React from 'react';
import styles from '../Settings.module.css';
import ToggleSwitch from '../../../components/Common/ToggleSwitch/ToggleSwitch';
import Dropdown from '../../../components/Common/Dropdown/Dropdown';

const PrivacySecuritySection = ({ settings, onToggle, onDropdownChange }) => {
  const screenshotIntervalOptions = [
    { value: 'Every 1 minute', label: 'Every 1 minute' },
    { value: 'Every 5 minutes', label: 'Every 5 minutes' },
    { value: 'Every 10 minutes', label: 'Every 10 minutes' },
    { value: 'Every 30 minutes', label: 'Every 30 minutes' },
  ];

  const handleClearAllData = () => {
    if (window.confirm("Are you sure you want to clear all your data? This action cannot be undone.")) {
      alert("All data cleared! (Simulated)");
    }
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <i className="fas fa-user-shield"></i> Privacy & Security
      </h2>
      <p className={styles.optionDescription}>
        Manage your data privacy and security preferences.
      </p>
      <ToggleSwitch
        id="screenshotCapture"
        label="Screenshot Capture"
        checked={settings.screenshotCapture}
        onChange={() => onToggle('screenshotCapture')}
        description="Optional periodic screenshots for detailed analysis."
      />
      {settings.screenshotCapture && (
        <div className={styles.option}>
          <span className={styles.optionLabel}>Screenshot Interval</span>
          <Dropdown
            id="screenshotInterval"
            options={screenshotIntervalOptions}
            selectedValue={settings.screenshotInterval}
            onChange={(e) => onDropdownChange('screenshotInterval', e.target.value)}
          />
        </div>
      )}
      <ToggleSwitch
        id="dataEncryption"
        label="Data Encryption"
        checked={settings.dataEncryption}
        onChange={() => onToggle('dataEncryption')}
        description="Encrypt all stored data locally and in cloud."
      />
      <div className={`${styles.option} ${styles.buttonContainer}`}>
        <span className={styles.optionLabel}>Clear All Data</span>
        <button onClick={handleClearAllData} className={styles.clearDataButton}>
          Clear All Data
        </button>
      </div>
    </div>
  );
};

export default PrivacySecuritySection;