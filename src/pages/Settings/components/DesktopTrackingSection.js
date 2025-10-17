import React from 'react';
import styles from '../Settings.module.css';
import ToggleSwitch from '../../../components/Common/ToggleSwitch/ToggleSwitch';
import Dropdown from '../../../components/Common/Dropdown/Dropdown';

const DesktopTrackingSection = ({ settings, onToggle, onDropdownChange }) => {
  const idleThresholdOptions = [
    { value: '3 minutes', label: '3 minutes' },
    { value: '5 minutes', label: '5 minutes' },
    { value: '10 minutes', label: '10 minutes' },
  ];

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <i className="fas fa-desktop"></i> Desktop Tracking
      </h2>
      <p className={styles.optionDescription}>
        Configure how the desktop application monitors your activities.
      </p>
      <ToggleSwitch
        id="appUsageTracking"
        label="Application Usage Tracking"
        checked={settings.appUsageTracking}
        onChange={() => onToggle('appUsageTracking')}
        description="Monitor which applications you use and for how long."
      />
      <ToggleSwitch
        id="windowTitleTracking"
        label="Window Title Tracking"
        checked={settings.windowTitleTracking}
        onChange={() => onToggle('windowTitleTracking')}
        description="Log active window titles for detailed context."
      />
      <ToggleSwitch
        id="idleTimeDetection"
        label="Idle Time Detection"
        checked={settings.idleTimeDetection}
        onChange={() => onToggle('idleTimeDetection')}
        description="Detect periods of inactivity."
      />
      {settings.idleTimeDetection && (
        <div className={styles.option}>
          <span className={styles.optionLabel}>Idle Threshold (minutes)</span>
          <Dropdown
            id="idleThreshold"
            options={idleThresholdOptions}
            selectedValue={settings.idleThreshold}
            onChange={(e) => onDropdownChange('idleThreshold', e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default DesktopTrackingSection;