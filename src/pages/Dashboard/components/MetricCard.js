import React from 'react';
import styles from './MetricCard.module.css';

const MetricCard = ({ title, value, description, icon, color }) => {
  return (
    <div className={styles.metricCard}>
      <div className={styles.iconWrapper} style={{ backgroundColor: color }}>
        <i className={`${icon} ${styles.icon}`}></i>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.value}>{value}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default MetricCard;