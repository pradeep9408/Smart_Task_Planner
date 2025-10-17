import React from 'react';
import styles from '../Settings.module.css';
import ToggleSwitch from '../../../components/Common/ToggleSwitch/ToggleSwitch';

const NotificationsSection = ({ settings, onToggle }) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <i className="fas fa-bell"></i> Notifications
      </h2>
      <p className={styles.optionDescription}>
        Control when and how you receive alerts and reminders.
      </p>
      <ToggleSwitch
        id="notifications"
        label="Notifications"
        checked={settings.notifications}
        onChange={() => onToggle('notifications')}
        description="Control overall application notifications."
      />
      {settings.notifications && (
        <>
          <ToggleSwitch
            id="taskReminders"
            label="Task Reminders"
            checked={settings.taskReminders}
            onChange={() => onToggle('taskReminders')}
            description="Get notified about upcoming tasks."
          />
          <ToggleSwitch
            id="distractionAlerts"
            label="Distraction Alerts"
            checked={settings.distractionAlerts}
            onChange={() => onToggle('distractionAlerts')}
            description="Alert when using irrelevant applications."
          />
          <ToggleSwitch
            id="productivityReports"
            label="Productivity Reports"
            checked={settings.productivityReports}
            onChange={() => onToggle('productivityReports')}
            description="Daily and weekly productivity summaries."
          />
        </>
      )}
    </div>
  );
};

export default NotificationsSection;