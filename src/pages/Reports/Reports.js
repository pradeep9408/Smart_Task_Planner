import React, { useState, useEffect } from 'react';
import styles from './Reports.module.css';
import {
  getWeeklyReportSummary,
  getMonthlyToolUsageSummary,
  getLocationBasedPerformanceSummary,
} from '../../utils/systemMonitor'; // Import new report functions

// Import the reusable ReportCard component (you'll create this next)
import ReportCard from './components/ReportCard';

const Reports = () => {
  const [weeklyReport, setWeeklyReport] = useState(null);
  const [monthlyToolUsage, setMonthlyToolUsage] = useState(null);
  const [locationPerformance, setLocationPerformance] = useState(null);

  // Report Type Dropdown Options
  const reportTypeOptions = [
    { value: 'Weekly', label: 'Weekly Report' },
    { value: 'Monthly', label: 'Monthly Report' },
    { value: 'Custom', label: 'Custom Range' },
    { value: 'Daily', label: 'Daily Report' }, // Added Daily as per image
  ];
  const [selectedReportType, setSelectedReportType] = useState('Weekly'); // Default to Weekly

  useEffect(() => {
    const fetchReports = () => {
      setWeeklyReport(getWeeklyReportSummary());
      setMonthlyToolUsage(getMonthlyToolUsageSummary());
      setLocationPerformance(getLocationBasedPerformanceSummary());
    };

    fetchReports(); // Fetch initial data
    const intervalId = setInterval(fetchReports, 7000); // Update every 7 seconds for reports

    return () => clearInterval(intervalId); // Cleanup interval
  }, []);

  const handleGenerateNewReport = () => {
    // In a real application, this would trigger a backend process
    // to compile a new report based on current data or a custom range.
    // For demo, we just re-fetch the simulated data immediately.
    setWeeklyReport(getWeeklyReportSummary());
    setMonthlyToolUsage(getMonthlyToolUsageSummary());
    setLocationPerformance(getLocationBasedPerformanceSummary());
    alert('Generating a new report... (Simulated)');
  };


  return (
    <div className={styles.reportsPage}>
      <div className={styles.header}>
        <h1>Reports & Analytics</h1>
        <div className={styles.reportControls}>
          <select
            className={styles.reportTypeDropdown}
            value={selectedReportType}
            onChange={(e) => setSelectedReportType(e.target.value)}
          >
            {reportTypeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <button onClick={handleGenerateNewReport} className={styles.generateReportButton}>
            Generate New Report
          </button>
        </div>
      </div>

      <p className={styles.subHeader}>Generate and export detailed productivity reports</p>

      <div className={styles.reportsGrid}>
        {weeklyReport && (
          <ReportCard
            title="Weekly Productivity Report"
            period={weeklyReport.period}
            status="Ready" // Static status for demo
            type="Weekly"
            keyInsights={[
              `${weeklyReport.avgFocusScore}% average focus score`,
              `${weeklyReport.taskCompletionImprovement}% improvement in task completion`,
              `${weeklyReport.productivityPeaks} productivity peaks identified`,
            ]}
            onViewDetails={() => alert('Viewing Weekly Productivity Report Details')}
            onExportPdf={() => alert('Exporting Weekly Productivity Report to PDF')}
          />
        )}

        {monthlyToolUsage && (
          <ReportCard
            title="Monthly Tool Usage Analysis"
            period={monthlyToolUsage.period}
            status="Ready"
            type="Monthly"
            keyInsights={[
              `Top Tool: ${monthlyToolUsage.topTool} ${monthlyToolUsage.usagePercentage}% usage`,
              `${monthlyToolUsage.keyInsight}`,
            ]}
            onViewDetails={() => alert('Viewing Monthly Tool Usage Details')}
            onExportPdf={() => alert('Exporting Monthly Tool Usage to PDF')}
          />
        )}

        {locationPerformance && (
            <ReportCard
                title="Location-Based Task Performance"
                period={locationPerformance.period}
                status="Processing" // Example of different status
                type="Custom" // Example type
                keyInsights={[
                    `Home office: ${locationPerformance.homeOfficeCompletion}% completion`,
                    `Coffee shops: ${locationPerformance.coffeeShopCompletion}% completion`,
                    `Co-working: ${locationPerformance.coWorkingCompletion}% completion`,
                ]}
                onViewDetails={() => alert('Viewing Location-Based Performance Details')}
                onExportPdf={() => alert('Exporting Location-Based Performance to PDF')}
            />
        )}
      </div>

      <div className={styles.exportOptionsSection}>
        <h2 className={styles.exportOptionsTitle}>Export Options</h2>
        <p className={styles.exportOptionsDescription}>Choose your preferred format for report exports</p>
        <div className={styles.exportButtons}>
          <div className={styles.exportButtonCard} onClick={() => alert('Exporting to PDF Report')}>
            <i className="fas fa-file-pdf"></i>
            <h3>PDF Report</h3>
            <p>Professional formatted reports</p>
          </div>
          <div className={styles.exportButtonCard} onClick={() => alert('Exporting to CSV Data')}>
            <i className="fas fa-file-csv"></i>
            <h3>CSV Data</h3>
            <p>Raw data for analysis</p>
          </div>
          <div className={styles.exportButtonCard} onClick={() => alert('Exporting to JSON Export')}>
            <i className="fas fa-file-code"></i>
            <h3>JSON Export</h3>
            <p>API-ready format</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;