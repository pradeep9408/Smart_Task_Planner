import React from 'react';
import styles from '../Settings.module.css';
import ToggleSwitch from '../../../components/Common/ToggleSwitch/ToggleSwitch';
import Dropdown from '../../../components/Common/Dropdown/Dropdown';

const LocationTrackingSection = ({ settings, onToggle, onDropdownChange }) => {
  const locationAccuracyOptions = [
    { value: '10 meters', label: '10 meters' },
    { value: '50 meters', label: '50 meters' },
    { value: '100 meters', label: '100 meters' },
    { value: '500 meters', label: '500 meters' },
  ];

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <i className="fas fa-map-marker-alt"></i> Location Tracking
      </h2>
      <p className={styles.optionDescription}>
        Manage GPS and location-based task completion settings.
      </p>
      <ToggleSwitch
        id="gpsMonitoring"
        label="GPS Monitoring"
        checked={settings.gpsMonitoring}
        onChange={() => onToggle('gpsMonitoring')}
        description="Track location for physical tasks."
      />
      {settings.gpsMonitoring && (
        <div className={styles.option}>
          <span className={styles.optionLabel}>Location Accuracy Threshold</span>
          <Dropdown
            id="locationAccuracyThreshold"
            options={locationAccuracyOptions}
            selectedValue={settings.locationAccuracyThreshold}
            onChange={(e) => onDropdownChange('locationAccuracyThreshold', e.target.value)}
          />
        </div>
      )}
      <ToggleSwitch
        id="backgroundLocation"
        label="Background Location"
        checked={settings.backgroundLocation}
        onChange={() => onToggle('backgroundLocation')}
        description="Allow location tracking when app is in background."
      />
    </div>
  );
};

export default LocationTrackingSection;