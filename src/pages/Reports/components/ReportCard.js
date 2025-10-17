import React from 'react';
import styles from './ReportCard.module.css'; // This component has its own CSS Module
import reportsPageStyles from '../Reports.module.css'; // Reuses sectionCard from parent

const ReportCard = ({ title, period, status, type, keyInsights, onViewDetails, onExportPdf }) => {
  const getStatusClass = (reportStatus) => {
    switch (reportStatus.toLowerCase()) {
      case 'ready':
        return styles.statusReady;
      case 'processing':
        return styles.statusProcessing;
      case 'failed':
        return styles.statusFailed;
      default:
        return '';
    }
  };

  return (
    <div className={reportsPageStyles.sectionCard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.reportTitle}>{title}</h3>
        <span className={`${styles.reportStatus} ${getStatusClass(status)}`}>{status}</span>
      </div>
      <p className={styles.reportPeriod}>{period}</p>
      <div className={styles.reportTypeBadge}>{type}</div>

      <h4 className={styles.keyInsightsTitle}>Key Insights:</h4>
      <ul className={styles.keyInsightsList}>
        {keyInsights.map((insight, index) => (
          <li key={index}><i className="fas fa-circle"></i> {insight}</li>
        ))}
      </ul>

      <div className={styles.cardActions}>
        <button onClick={onViewDetails} className={styles.viewDetailsButton}>View Details</button>
        <button onClick={onExportPdf} className={styles.exportPdfButton}>Export PDF</button>
      </div>
    </div>
  );
};

export default ReportCard;