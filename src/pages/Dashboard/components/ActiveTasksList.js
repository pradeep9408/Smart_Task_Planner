import React from 'react';
import styles from './ActiveTasksList.module.css';
import dashboardStyles from '../Dashboard.module.css';

const ActiveTasksList = ({ tasks }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'active':
        return styles.statusActive;
      case 'completed':
        return styles.statusCompleted;
      case 'pending':
        return styles.statusPending;
      default:
        return '';
    }
  };

  return (
    <div className={dashboardStyles.sectionCard}>
      <h2 className={dashboardStyles.sectionTitle}>Active Tasks</h2>
      <p className={styles.subText}>Currently running task monitors</p>
      <div className={styles.taskList}>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div key={task.id} className={styles.taskItem}>
              <div className={styles.taskInfo}>
                <i className={`fas fa-circle ${getStatusClass(task.status)} ${styles.taskStatusIcon}`}></i>
                <div className={styles.taskDetails}>
                  <p className={styles.taskName}>{task.name}</p>
                  <p className={styles.taskTools}>{task.requiredTools || task.location || ''}</p>
                </div>
              </div>
              {task.time && <span className={styles.taskTime}>{task.time}</span>}
              {task.status === 'completed' && <span className={styles.completedText}>Completed</span>}
              {task.status === 'pending' && <span className={styles.pendingText}>Pending</span>}
            </div>
          ))
        ) : (
          <p className={styles.noTasksMessage}>No active tasks right now. Time for a break or create a new one!</p>
        )}
      </div>
    </div>
  );
};

export default ActiveTasksList;