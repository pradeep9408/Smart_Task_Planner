import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import DashboardPage from './pages/Dashboard/Dashboard';
import TaskManagerPage from './pages/TaskManager/TaskManager';
import AnalyticsPage from './pages/Analytics/Analytics';
import ReportsPage from './pages/Reports/Reports';
import SettingsPage from './pages/Settings/Settings';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ProfilePage from './pages/Profile/ProfilePage';
import PrivateRoute from './components/Common/PrivateRoute';
import { getSimulatedSystemMetrics } from './utils/systemMonitor';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Complete React Portfolio',
      type: 'Technical Task',
      requiredTools: 'VS Code, Chrome, GitHub',
      timelineDays: 15,
      actualHours: '2h 15m',
      progress: 55,
      status: 'active',
    },
    {
      id: 2,
      name: 'Morning Workout',
      type: 'Physical Task',
      location: 'Gym',
      taskDate: '2025-07-25',
      taskTime: '7:00 AM',
      progress: 100,
      status: 'completed',
    },
    {
      id: 3,
      name: 'Client Meeting',
      type: 'Physical Task',
      location: 'Downtown Office',
      taskDate: '2025-07-26',
      taskTime: '3:00 PM',
      progress: 0,
      status: 'upcoming',
    },
    {
      id: 4,
      name: 'Code Review Session',
      type: 'Technical Task',
      requiredTools: 'VS Code, Jira',
      timelineDays: 7,
      actualHours: '1h 30m',
      progress: 80,
      status: 'active',
    },
    {
      id: 5,
      name: 'Project Brainstorm',
      type: 'Technical Task',
      requiredTools: 'Miro, Google Meet',
      timelineDays: 3,
      actualHours: '',
      progress: 0,
      status: 'active',
    },
    {
      id: 6,
      name: 'Grocery Shopping',
      type: 'Physical Task',
      location: 'SuperMart',
      taskDate: '2025-07-25',
      taskTime: '6:00 PM',
      progress: 100,
      status: 'completed',
    },
    {
      id: 7,
      name: 'Send weekly report',
      type: 'Technical Task',
      requiredTools: 'Email, Docs',
      timelineDays: 1,
      actualHours: '',
      progress: 0,
      status: 'active',
    },
  ]);

  const [productivityScore, setProductivityScore] = useState(85);

  useEffect(() => {
    const updateScore = () => {
      const metrics = getSimulatedSystemMetrics();
      setProductivityScore(metrics.focusScore);
    };
    updateScore();
    const interval = setInterval(updateScore, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCreateTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    console.log('New Task Created:', newTask);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout productivityScore={productivityScore} />}>
              <Route path="/" element={<DashboardPage tasks={tasks} />} />
              <Route path="/tasks" element={<TaskManagerPage tasks={tasks} onCreateTask={handleCreateTask} onUpdateTask={handleUpdateTask} />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;