import React from 'react';
import analyticsStyles from '../Analytics.module.css';

const AnalyticsSummaryCards = ({ metrics }) => {
  return (
    <div className={`${analyticsStyles.chartCard} ${analyticsStyles.summaryCardsGrid}`}>
      <div className={analyticsStyles.summaryCard}>
        <h4 className={analyticsStyles.summaryCardTitle}>Average Focus Time</h4>
        <p className={analyticsStyles.summaryCardValue}>{metrics.avgFocusTime}</p>
        <p className={analyticsStyles.summaryCardDescription}>Below first distraction</p>
      </div>
      <div className={analyticsStyles.summaryCard}>
        <h4 className={analyticsStyles.summaryCardTitle}>Productivity Streak</h4>
        <p className={analyticsStyles.summaryCardValue}>{metrics.productivityStreak}</p>
        <p className={analyticsStyles.summaryCardDescription}>Above 80% focus score</p>
      </div>
      <div className={analyticsStyles.summaryCard}>
        <h4 className={analyticsStyles.summaryCardTitle}>Top Distraction</h4>
        <p className={analyticsStyles.summaryCardValue}>{metrics.topDistraction}</p>
        <p className={analyticsStyles.summaryCardDescription}>{metrics.distractionCount} interruptions this week</p>
      </div>
    </div>
  );
};

export default AnalyticsSummaryCards;