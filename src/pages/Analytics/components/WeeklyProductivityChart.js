import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  CartesianGrid,
} from 'recharts';
import analyticsStyles from '../Analytics.module.css';

const WeeklyProductivityChart = ({ data }) => {
  return (
    <div className={analyticsStyles.chartCard}>
      <h3 className={analyticsStyles.chartTitle}>Weekly Productivity Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis dataKey="name" stroke="#333" />
          <YAxis label={{ value: 'Hours Spent', angle: -90, position: 'insideLeft', stroke: "#333" }} stroke="#333" />
          <Tooltip cursor={{ fill: 'rgba(0,0,0,0.1)' }} formatter={(value) => [`${value} hours`, '']} />
          <Legend />
          <Bar dataKey="focused" stackId="a" fill="#4CAF50" name="Focused" />
          <Bar dataKey="distracted" stackId="a" fill="#FFC107" name="Distracted" />
          <Bar dataKey="idle" stackId="a" fill="#9E9E9E" name="Idle" />
        </BarChart>
      </ResponsiveContainer>
      <p className={analyticsStyles.chartDescription}>Hours spent in different activity states</p>
    </div>
  );
};

export default WeeklyProductivityChart;