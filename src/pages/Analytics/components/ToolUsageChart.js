import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import analyticsStyles from '../Analytics.module.css';

const ToolUsageChart = ({ data }) => {
  const COLORS = ['#6a5acd', '#2196F3', '#FFEB3B', '#FF9800', '#795548', '#9E9E9E'];

  return (
    <div className={analyticsStyles.chartCard}>
      <h3 className={analyticsStyles.chartTitle}>Tool Usage Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}%`, '']} />
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
      <p className={analyticsStyles.chartDescription}>Time spent on different applications</p>
    </div>
  );
};

export default ToolUsageChart;