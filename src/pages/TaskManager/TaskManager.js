import React, { useState } from 'react';
import styles from './TaskManager.module.css';
import CreateTaskModal from './components/CreateTaskModal';

const TaskManager = ({ tasks, onCreateTask, onUpdateTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'active':
        return styles.statusActive;
      case 'completed':
        return styles.statusCompleted;
      case 'upcoming':
        return styles.statusUpcoming;
      case 'pending':
        return styles.statusPending;
      default:
        return '';
    }
  };

  const toggleTaskCompletion = (taskId) => {
    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (taskToUpdate) {
      const updatedStatus = taskToUpdate.status === 'completed' ? 'active' : 'completed';
      const updatedProgress = updatedStatus === 'completed' ? 100 : 0;
      onUpdateTask({ ...taskToUpdate, status: updatedStatus, progress: updatedProgress });
    }
  };

  return (
    <div className={styles.taskManager}>
      <div className={styles.header}>
        <h1>Task Manager</h1>
        <p className={styles.subHeader}>Create and monitor your tasks with AI-powered tracking</p>
        <button onClick={handleOpenModal} className={styles.newTaskButton}>
          <i className="fas fa-plus"></i> New Task
        </button>
      </div>

      <div className={styles.taskList}>
        {tasks.map((task) => (
          <div key={task.id} className={styles.taskCard}>
            <div className={styles.taskHeader}>
              <h3 className={styles.taskName}>{task.name}</h3>
              <span
                className={`${styles.taskStatus} ${getStatusClass(task.status)}`}
                onClick={() => toggleTaskCompletion(task.id)}
                style={{ cursor: 'pointer' }}
              >
                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </span>
            </div>
            {task.type === 'Technical Task' && (
              <>
                <div className={styles.taskDetail}>
                  <strong>Required Tools:</strong> {task.requiredTools}
                </div>
                <div className={styles.taskDetail}>
                  <strong>Timeline:</strong> {task.timelineDays} days
                  {task.actualHours && <span> | Actual: {task.actualHours}</span>}
                </div>
              </>
            )}
            {task.type === 'Physical Task' && (
              <>
                <div className={styles.taskDetail}>
                  <strong>Location:</strong> {task.location}
                </div>
                <div className={styles.taskDetail}>
                  <strong>Date:</strong> {task.taskDate} | <strong>Time:</strong> {task.taskTime}
                </div>
              </>
            )}
            <div className={styles.progressBarContainer}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${task.progress}%` }}
              ></div>
              <span className={styles.progressText}>{task.progress}%</span>
            </div>
          </div>
        ))}
      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreateTask={onCreateTask}
      />
    </div>
  );
};

export default TaskManager;