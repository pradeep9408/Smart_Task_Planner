import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
} from 'recharts';
import analyticsStyles from '../Analytics.module.css';

const FocusScoreLineChart = ({ data }) => {
  return (
    <div className={analyticsStyles.chartCard}>
      <h3 className={analyticsStyles.chartTitle}>Focus Score Throughout Day</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis dataKey="time" stroke="#333" />
          <YAxis domain={[0, 100]} label={{ value: 'Focus Score (%)', angle: -90, position: 'insideLeft', stroke: "#333" }} stroke="#333" />
          <Tooltip formatter={(value) => [`${value}%`, 'Focus Score']} />
          <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      <p className={analyticsStyles.chartDescription}>Real-time focus and concentration levels</p>
    </div>
  );
};

export default FocusScoreLineChart;