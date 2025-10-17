import React, { useState } from 'react';
import styles from '../Settings.module.css';
import ToggleSwitch from '../../../components/Common/ToggleSwitch/ToggleSwitch';
import Dropdown from '../../../components/Common/Dropdown/Dropdown';

const MobileSyncSection = ({ settings, onToggle, onDropdownChange }) => {
  const syncFrequencyOptions = [
    { value: 'Real-time', label: 'Real-time' },
    { value: 'Hourly', label: 'Hourly' },
    { value: 'Daily', label: 'Daily' },
  ];

  const [pairingCode, setPairingCode] = useState('');
  const [pairingStatus, setPairingStatus] = useState('');
  const [enteredMobileCode, setEnteredMobileCode] = useState('');

  const handleGeneratePairingCode = () => {
    setPairingStatus('generating');
    setPairingCode('');
    setEnteredMobileCode('');

    setTimeout(() => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let newCode = '';
      for (let i = 0; i < 6; i++) {
        newCode += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      setPairingCode(newCode);
      setPairingStatus('waiting');
      console.log(`Simulated Pairing Code Generated: ${newCode}. Waiting for mobile app entry.`);

      setTimeout(() => {
        if (pairingStatus === 'waiting') {
            setPairingStatus('expired');
            setPairingCode('');
            console.log('Simulated Pairing Code Expired.');
        }
      }, 30000);

    }, 1500);
  };

  const handlePairDevice = () => {
      if (!enteredMobileCode) {
          alert("Please enter a code from your mobile device.");
          return;
      }
      setPairingStatus('connecting');
      console.log(`Attempting to pair with entered mobile code: ${enteredMobileCode} (Expected: ${pairingCode})`);

      setTimeout(() => {
          if (enteredMobileCode === pairingCode && pairingCode !== '') {
              setPairingStatus('success');
              alert('Device Paired Successfully!');
              setPairingCode('');
          } else {
              setPairingStatus('error');
              alert('Pairing Failed: Invalid or expired code.');
          }
      }, 2000);
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <i className="fas fa-mobile-alt"></i> Mobile Synchronization
      </h2>
      <ToggleSwitch
        id="mobileSync"
        label="Auto Sync"
        checked={settings.mobileSync}
        onChange={() => onToggle('mobileSync')}
        description="Automatically sync data between desktop/web and mobile app."
      />
      {settings.mobileSync && (
        <>
          <div className={styles.option}>
            <span className={styles.optionLabel}>Sync Frequency</span>
            <Dropdown
              id="syncFrequency"
              options={syncFrequencyOptions}
              selectedValue={settings.syncFrequency}
              onChange={(e) => onDropdownChange('syncFrequency', e.target.value)}
            />
          </div>

          <div className={`${styles.option} ${styles.noHoverEffect}`}>
            <span className={styles.optionLabel}>Link Mobile Device</span>
            <button
                className={styles.generateCodeButton}
                onClick={handleGeneratePairingCode}
                disabled={pairingStatus === 'generating' || pairingStatus === 'waiting' || pairingStatus === 'connecting'}
            >
              {pairingStatus === 'generating' ? 'Generating...' : 'Generate Pairing Code'}
            </button>
          </div>

          {pairingCode && (pairingStatus === 'waiting' || pairingStatus === 'connecting') && (
            <div className={styles.pairingCodeDisplay}>
                <p>Enter this code in your mobile app:</p>
                <span className={styles.generatedCode}>{pairingCode}</span>
                <p className={styles.pairingInfo}>Code is valid for 30 seconds.</p>
            </div>
          )}

          {(pairingStatus === 'waiting' || pairingStatus === 'connecting' || pairingStatus === 'success' || pairingStatus === 'error' || pairingStatus === 'expired') && (
                <div className={`${styles.pairingStatusMessage} ${styles[pairingStatus]}`}>
                    {pairingStatus === 'waiting' && <p>Waiting for mobile app input...</p>}
                    {pairingStatus === 'connecting' && <p>Connecting...</p>}
                    {pairingStatus === 'success' && <p>Mobile device paired successfully!</p>}
                    {pairingStatus === 'error' && <p>Pairing failed. Please try again.</p>}
                    {pairingStatus === 'expired' && <p>Code expired. Generate a new one.</p>}
                </div>
          )}

          <div className={`${styles.option} ${styles.noHoverEffect}`}>
            <span className={styles.optionLabel}>Mobile App Pairing Code Entry</span>
            <div className={styles.pairingCodeInput}>
                <input
                    type="text"
                    placeholder="Enter code from mobile app"
                    className={styles.textInput}
                    value={enteredMobileCode}
                    onChange={(e) => setEnteredMobileCode(e.target.value)}
                    disabled={!settings.mobileSync || pairingStatus === 'generating' || pairingStatus === 'connecting'}
                />
                <button
                    className={styles.saveButton}
                    onClick={handlePairDevice}
                    disabled={!settings.mobileSync || !enteredMobileCode || pairingStatus === 'generating' || pairingStatus === 'connecting'}
                >
                    {pairingStatus === 'connecting' ? 'Pairing...' : 'Pair Device'}
                </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileSyncSection;