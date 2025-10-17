import React from 'react';
import styles from './TodaysProgress.module.css';
import dashboardStyles from '../Dashboard.module.css';

const TodaysProgress = ({ progress }) => {
  return (
    <div className={dashboardStyles.sectionCard}>
      <h2 className={dashboardStyles.sectionTitle}>Today's Progress</h2>
      <p className={styles.subText}>Task completion breakdown</p>

      <div className={styles.progressBars}>
        <div className={styles.progressBarItem}>
          <span className={styles.label}>Technical Tasks</span>
          <div className={styles.barWrapper}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${(progress.technical.total > 0 ? (progress.technical.completed / progress.technical.total) * 100 : 0)}%` }}
              ></div>
            </div>
            <span className={styles.completion}>{`${progress.technical.completed}/${progress.technical.total} completed`}</span>
          </div>
        </div>

        <div className={styles.progressBarItem}>
          <span className={styles.label}>Physical Tasks</span>
          <div className={styles.barWrapper}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${(progress.physical.total > 0 ? (progress.physical.completed / progress.physical.total) * 100 : 0)}%` }}
              ></div>
            </div>
            <span className={styles.completion}>{`${progress.physical.completed}/${progress.physical.total} completed`}</span>
          </div>
        </div>

        <div className={styles.progressBarItem}>
          <span className={styles.label}>Meetings</span>
          <div className={styles.barWrapper}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${(progress.meetings.total > 0 ? (progress.meetings.completed / progress.meetings.total) * 100 : 0)}%` }}
              ></div>
            </div>
            <span className={styles.completion}>{`${progress.meetings.completed}/${progress.meetings.total} completed`}</span>
          </div>
        </div>
      </div>

      <div className={styles.overallProgress}>
        <span className={styles.overallLabel}>Overall Progress</span>
        <span className={styles.overallValue}>{progress.overall}%</span>
      </div>
    </div>
  );
};

export default TodaysProgress;