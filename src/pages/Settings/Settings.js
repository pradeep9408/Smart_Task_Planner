import React, { useState } from 'react';
import styles from './Settings.module.css';

import DesktopTrackingSection from './components/DesktopTrackingSection';
import LocationTrackingSection from './components/LocationTrackingSection';
import NotificationsSection from './components/NotificationsSection';
import PrivacySecuritySection from './components/PrivacySecuritySection';
import MobileSyncSection from './components/MobileSyncSection';

const Settings = () => {
  const [settings, setSettings] = useState({
    desktopTracking: true,
    appUsageTracking: true,
    windowTitleTracking: false,
    idleTimeDetection: true,
    idleThreshold: '3 minutes',
    gpsMonitoring: true,
    locationAccuracyThreshold: '100 meters',
    backgroundLocation: false,
    notifications: true,
    taskReminders: true,
    distractionAlerts: true,
    productivityReports: true,
    screenshotCapture: false,
    screenshotInterval: 'Every 10 minutes',
    dataEncryption: true,
    mobileSync: false,
    syncFrequency: 'Real-time',
  });

  const handleSettingChange = (settingName) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [settingName]: !prevSettings[settingName]
    }));
  };

  const handleDropdownChange = (settingName, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [settingName]: value
    }));
  };

  return (
    <div className={styles.settings}>
      <h1>Settings</h1>
      <p className={styles.subHeader}>Configure your Smart Task Planner preferences and tracking options.</p>

      <DesktopTrackingSection
        settings={settings}
        onToggle={handleSettingChange}
        onDropdownChange={handleDropdownChange}
      />
      <LocationTrackingSection
        settings={settings}
        onToggle={handleSettingChange}
        onDropdownChange={handleDropdownChange}
      />
      <NotificationsSection
        settings={settings}
        onToggle={handleSettingChange}
      />
      <PrivacySecuritySection
        settings={settings}
        onToggle={handleSettingChange}
        onDropdownChange={handleDropdownChange}
      />
      <MobileSyncSection
        settings={settings}
        onToggle={handleSettingChange}
        onDropdownChange={handleDropdownChange}
      />

      <div className={styles.resetButtonContainer}>
        <button className={styles.resetButton}>Reset to Defaults</button>
        <button className={styles.saveButton}>Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;