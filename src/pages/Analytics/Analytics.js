import React, { useState, useEffect } from 'react';
import styles from './Analytics.module.css';
import {
  getSimulatedSystemMetrics,
  getActiveApplicationUsage,
  getDistractionAlerts,
  getWeeklyProductivity,
} from '../../utils/systemMonitor';

import WeeklyProductivityChart from './components/WeeklyProductivityChart';
import ToolUsageChart from './components/ToolUsageChart';
import FocusScoreLineChart from './components/FocusScoreLineChart';
import AnalyticsSummaryCards from './components/AnalyticsSummaryCards';

const Analytics = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [toolUsageData, setToolUsageData] = useState([]);
  const [focusHistory, setFocusHistory] = useState([]);
  const [summaryMetrics, setSummaryMetrics] = useState({
    avgFocusTime: '0h 00m',
    productivityStreak: '0 days',
    topDistraction: 'N/A',
    distractionCount: 0,
  });

  useEffect(() => {
    const updateAnalyticsData = () => {
      const systemMetrics = getSimulatedSystemMetrics();
      const appUsage = getActiveApplicationUsage();
      const distractions = getDistractionAlerts();
      const weekly = getWeeklyProductivity();

      setWeeklyData(weekly);
      const formattedToolUsage = Object.entries(appUsage).map(([name, value]) => ({
        name: name,
        value: value,
      }));
      setToolUsageData(formattedToolUsage);
      setFocusHistory(systemMetrics.focusScoreHistory);

      setSummaryMetrics({
        avgFocusTime: systemMetrics.activeTime,
        productivityStreak: '7 days',
        topDistraction: 'Social Media',
        distractionCount: distractions.count,
      });
    };

    updateAnalyticsData();
    const intervalId = setInterval(updateAnalyticsData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleGenerateReport = () => {
    alert('Generate Report clicked! (Logic to create a report would go here.)');
  };

  const reportTypeOptions = [
    { value: 'Daily Report', label: 'Daily Report' },
    { value: 'Weekly Report', label: 'Weekly Report' },
    { value: 'Monthly Report', label: 'Monthly Report' },
    { value: 'Custom Range', label: 'Custom Range' },
  ];
  const [selectedReportType, setSelectedReportType] = useState('Weekly Report');


  return (
    <div className={styles.analyticsPage}>
      <div className={styles.header}>
        <h1>Analytics Dashboard</h1>
        <p className={styles.subHeader}>Deep insights into your productivity patterns and behaviors</p>
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
            <button onClick={handleGenerateReport} className={styles.generateReportButton}>
                Generate New Report
            </button>
        </div>
      </div>

      <div className={styles.chartsGrid}>
        <WeeklyProductivityChart data={weeklyData} />
        <ToolUsageChart data={toolUsageData} />
        <FocusScoreLineChart data={focusHistory} />
        <AnalyticsSummaryCards metrics={summaryMetrics} />
      </div>
    </div>
  );
};

export default Analytics;