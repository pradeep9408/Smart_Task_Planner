import React, { useState } from 'react';
import Modal from '../../../components/Common/Modal/Modal';
import Dropdown from '../../../components/Common/Dropdown/Dropdown';
import MapDisplay from '../../../components/Common/MapDisplay/MapDisplay';
import { getCurrentPosition } from '../../../services/geolocation';
import styles from './CreateTaskModal.module.css';

const CreateTaskModal = ({ isOpen, onClose, onCreateTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskType, setTaskType] = useState('');
  const [requiredTools, setRequiredTools] = useState('');
  const [timelineDays, setTimelineDays] = useState('');
  const [location, setLocation] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [geolocationStatus, setGeolocationStatus] = useState('');
  const [mapPosition, setMapPosition] = useState(null);

  const taskTypeOptions = [
    { value: '', label: 'Select task type' },
    { value: 'Technical Task', label: 'Technical Task' },
    { value: 'Physical Task', label: 'Physical Task' },
  ];

  const handleGetLocation = async () => {
    setGeolocationStatus('Fetching location...');
    setMapPosition(null);
    try {
      const position = await getCurrentPosition();
      const locationString = `Lat: ${position.latitude.toFixed(4)}, Lon: ${position.longitude.toFixed(4)}`;
      setLocation(locationString);
      setMapPosition([position.latitude, position.longitude]);
      setGeolocationStatus('Location fetched successfully!');
    } catch (error) {
      setGeolocationStatus(`Error: ${error.message}`);
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName || !taskType) {
      alert('Please fill in all required fields.');
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskName,
      type: taskType,
      status: 'active',
      ...(taskType === 'Technical Task' && {
        requiredTools,
        timelineDays: parseInt(timelineDays),
      }),
      ...(taskType === 'Physical Task' && {
        location,
        taskDate,
        taskTime,
      }),
      progress: 0,
    };

    onCreateTask(newTask);
    setTaskName('');
    setTaskType('');
    setRequiredTools('');
    setTimelineDays('');
    setLocation('');
    setTaskDate('');
    setTaskTime('');
    setGeolocationStatus('');
    setMapPosition(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
      <p className={styles.modalDescription}>Add a new task to track your productivity and progress.</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="taskName">Task Name</label>
          <input
            type="text"
            id="taskName"
            className={styles.inputField}
            placeholder="Enter task name..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="taskType">Task Type</label>
          <Dropdown
            id="taskType"
            options={taskTypeOptions}
            selectedValue={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            required
          />
        </div>

        {taskType === 'Technical Task' && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="requiredTools">Required Tools/Software</label>
              <input
                type="text"
                id="requiredTools"
                className={styles.inputField}
                placeholder="e.g., VS Code, Chrome, GitHub..."
                value={requiredTools}
                onChange={(e) => setRequiredTools(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="timelineDays">Timeline (in days)</label>
              <input
                type="number"
                id="timelineDays"
                className={styles.inputField}
                placeholder="e.g., 15"
                value={timelineDays}
                onChange={(e) => setTimelineDays(e.target.value)}
                min="1"
              />
            </div>
          </>
        )}

        {taskType === 'Physical Task' && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="location">Location/Navigation</label>
              <div className={styles.locationInputGroup}>
                <input
                  type="text"
                  id="location"
                  className={styles.inputField}
                  placeholder="Enter address or location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <button
                    type="button"
                    onClick={handleGetLocation}
                    className={styles.geolocationButton}
                    disabled={geolocationStatus.startsWith('Fetching')}
                >
                    <i className="fas fa-map-marker-alt"></i>
                </button>
              </div>
              {geolocationStatus && <p className={styles.geolocationStatus}>{geolocationStatus}</p>}
            </div>

            {mapPosition && (
                <div className={styles.mapContainer}>
                    <MapDisplay position={mapPosition} />
                </div>
            )}
            
            <div className={styles.formGroup}>
              <label htmlFor="taskDate">Task Date</label>
              <input
                type="date"
                id="taskDate"
                className={styles.inputField}
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="taskTime">Time</label>
              <input
                type="time"
                id="taskTime"
                className={styles.inputField}
                value={taskTime}
                onChange={(e) => setTaskTime(e.target.value)}
              />
            </div>
          </>
        )}

        <div className={styles.formActions}>
          <button type="submit" className={styles.createButton}>Create Task</button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;