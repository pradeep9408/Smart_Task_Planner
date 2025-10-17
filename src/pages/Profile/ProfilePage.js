import React from 'react';
import styles from './ProfilePage.module.css';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
    const { currentUser } = useAuth();
    const userName = currentUser ? currentUser.email.split('@')[0] : 'Guest';

    return (
        <div className={styles.profileContainer}>
            <div className={styles.pageHeader}>
                <h1>User Profile</h1>
            </div>

            <div className={styles.contentGrid}>
                <div className={styles.infoCard}>
                    <div className={styles.infoRow}>
                        <span className={styles.label}>Email Address:</span>
                        <span className={styles.value}>{currentUser.email}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.label}>Username:</span>
                        <span className={styles.value}>{userName}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.label}>Account Status:</span>
                        <span className={styles.value}>Active</span>
                    </div>
                </div>

                <div className={styles.infoCard}>
                    <h2 className={styles.cardTitle}>Account Actions</h2>
                    <div className={styles.actionButton}>
                        <button className={styles.primaryButton}>Change Password</button>
                        <span className={styles.actionDescription}>Change your password securely.</span>
                    </div>
                    <div className={styles.actionButton}>
                        <button className={styles.dangerButton}>Delete Account</button>
                        <span className={styles.actionDescription}>Permanently delete your account and data.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;