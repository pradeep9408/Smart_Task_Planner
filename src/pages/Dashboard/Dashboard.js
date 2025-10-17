import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { getSimulatedSystemMetrics } from '../../utils/systemMonitor';

import MetricCard from './components/MetricCard';
import ActiveTasksList from './components/ActiveTasksList';
import TodaysProgress from './components/TodaysProgress';

const Dashboard = ({ tasks }) => {
  const [systemMetrics, setSystemMetrics] = useState({
    activeTime: '0h 00m',
    activeTimeChange: 'Loading...',
    focusScore: 0,
  });

  const today = new Date();
  const todayDateString = today.toISOString().slice(0, 10);

  useEffect(() => {
    const updateMetrics = () => {
      setSystemMetrics(getSimulatedSystemMetrics());
    };

    updateMetrics();
    const intervalId = setInterval(updateMetrics, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const completedTasks = tasks.filter(task => task.status === 'completed');
  const totalTasks = tasks.length;
  const tasksCompletedValue = `${completedTasks.length}/${totalTasks}`;
  const remainingTasksToday = tasks.filter(task =>
    (task.status === 'active' || task.status === 'pending') &&
    (task.taskDate === todayDateString || !task.taskDate)
  ).length;

  const physicalTasks = tasks.filter(task => task.type === 'Physical Task');
  const completedPhysicalTasksToday = physicalTasks.filter(task =>
    task.status === 'completed' && task.taskDate === todayDateString
  );
  const locationTasksValue = `${completedPhysicalTasksToday.length}/${physicalTasks.length}`;
  const remainingLocationTasks = physicalTasks.length - completedPhysicalTasksToday.length;

  const dashboardMetrics = [
    {
      id: 1,
      title: 'Active Time Today',
      value: systemMetrics.activeTime,
      description: systemMetrics.activeTimeChange,
      icon: 'fas fa-hourglass-half',
      color: '#4CAF50'
    },
    {
      id: 2,
      title: 'Tasks Completed',
      value: tasksCompletedValue,
      description: `${remainingTasksToday} remaining today`,
      icon: 'fas fa-check-circle',
      color: '#2196F3'
    },
    {
      id: 3,
      title: 'Location Tasks',
      value: locationTasksValue,
      description: `${remainingLocationTasks} remaining location tasks`,
      icon: 'fas fa-map-marker-alt',
      color: '#FFC107'
    },
    {
      id: 4,
      title: 'Focus Score',
      value: `${systemMetrics.focusScore}%`,
      description: systemMetrics.focusScore >= 80 ? 'Excellent focus today' : (systemMetrics.focusScore >= 60 ? 'Good focus today' : 'Needs more focus'),
      icon: 'fas fa-brain',
      color: '#9C27B0'
    },
  ];

  const activeTasksList = tasks.filter(task =>
    task.status !== 'completed'
  );

  const todaysProgressCalculated = {
    technical: {
      completed: tasks.filter(t => t.type === 'Technical Task' && t.status === 'completed').length,
      total: tasks.filter(t => t.type === 'Technical Task').length
    },
    physical: {
      completed: tasks.filter(t => t.type === 'Physical Task' && t.status === 'completed').length,
      total: tasks.filter(t => t.type === 'Physical Task').length
    },
    meetings: {
      completed: tasks.filter(t => t.name.toLowerCase().includes('meeting') && t.status === 'completed').length,
      total: tasks.filter(t => t.name.toLowerCase().includes('meeting')).length
    },
  };

  const totalCompletedForProgress = todaysProgressCalculated.technical.completed + todaysProgressCalculated.physical.completed + todaysProgressCalculated.meetings.completed;
  const totalOverallForProgress = todaysProgressCalculated.technical.total + todaysProgressCalculated.physical.total + todaysProgressCalculated.meetings.total;
  const overallProgressPercentage = totalOverallForProgress > 0 ? Math.round((totalCompletedForProgress / totalOverallForProgress) * 100) : 0;
  todaysProgressCalculated.overall = overallProgressPercentage;


  return (
    <div className={styles.dashboard}>
      <h1 className={styles.pageTitle}>Dashboard Overview</h1>
      <p className={styles.pageDescription}>Track your productivity and task completion in real-time</p>

      <div className={styles.metricsGrid}>
        {dashboardMetrics.map(metric => (
          <MetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            description={metric.description}
            icon={metric.icon}
            color={metric.color}
          />
        ))}
      </div>

      <div className={styles.sectionsGrid}>
        <ActiveTasksList tasks={activeTasksList} />
        <TodaysProgress progress={todaysProgressCalculated} />
      </div>
    </div>
  );
};

export default Dashboard;