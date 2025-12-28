import React, { useState } from 'react';
import { useMockData } from '../contexts/MockContext';
import { Bell, Key, Settings, User } from 'lucide-react';

const Profile = () => {
    const { user } = useMockData();
    const [activeTab, setActiveTab] = useState('Account');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Account':
                return (
                    <div className="profile-form-container">
                        <div className="profile-picture-section">
                            <div className="avatar-large-wrapper">
                                <img src={user.avatar || "https://csspicker.dev/api/image/?q=woman+portrait&image_type=photo"} alt="Kristin Jones" className="avatar-large" />
                                <div className="edit-badge">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0084ff" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                </div>
                            </div>
                        </div>

                        <form className="profile-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" defaultValue={user.name} placeholder="Enter your name" />
                            </div>

                            <div className="form-group">
                                <label>Phone</label>
                                <div className="phone-input-wrapper">
                                    <div className="country-select">
                                        <img src="https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg" alt="DE" className="flag-icon" />
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </div>
                                    <input type="tel" defaultValue="+49 30 901820" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" defaultValue={user.email} placeholder="Enter your email" />
                            </div>
                        </form>

                        <footer className="form-footer">
                            <span className="footer-hint">Edit your account information</span>
                            <button className="btn-save">Save updates</button>
                        </footer>
                    </div>
                );
            case 'Change Password':
                return (
                    <div className="profile-form-container">
                        <form className="profile-form">
                            <div className="form-group">
                                <label>Current Password</label>
                                <input type="password" placeholder="••••••••" />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input type="password" placeholder="Enter new password" />
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input type="password" placeholder="Confirm new password" />
                            </div>
                        </form>
                        <footer className="form-footer">
                            <span className="footer-hint">Make sure it's secure</span>
                            <button className="btn-save">Update Password</button>
                        </footer>
                    </div>
                );
            case 'Notifications':
                return (
                    <div className="profile-form-container">
                        <div className="profile-form">
                            <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <label style={{ fontSize: '14px', color: '#333' }}>Email Notifications</label>
                                    <p style={{ fontSize: '12px', color: '#8e9aaf' }}>Receive updates via email</p>
                                </div>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <label style={{ fontSize: '14px', color: '#333' }}>Push Notifications</label>
                                    <p style={{ fontSize: '12px', color: '#8e9aaf' }}>Receive updates on your device</p>
                                </div>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                );
            case 'Preferences':
                return (
                    <div className="profile-form-container">
                        <form className="profile-form">
                            <div className="form-group">
                                <label>Language</label>
                                <select style={{ padding: '14px 16px', border: '1px solid var(--border-color)', borderRadius: '10px', width: '100%', outline: 'none' }}>
                                    <option>English (US)</option>
                                    <option>Vietnamese</option>
                                    <option>German</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Time Zone</label>
                                <select style={{ padding: '14px 16px', border: '1px solid var(--border-color)', borderRadius: '10px', width: '100%', outline: 'none' }}>
                                    <option>UTC+07:00 (Bangkok, Hanoi, Jakarta)</option>
                                    <option>UTC+00:00 (London)</option>
                                </select>
                            </div>
                        </form>
                        <footer className="form-footer">
                            <span className="footer-hint">Customize your experience</span>
                            <button className="btn-save">Save Preferences</button>
                        </footer>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <header className="content-header">
                <h1>Profile</h1>
            </header>

            <div className="tabs-container">
                <div className="tabs">
                    {['Account', 'Change Password', 'Notifications', 'Preferences'].map(tab => (
                        <button
                            key={tab}
                            className={`tab ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === 'Account' ? 'Account information' : tab}
                        </button>
                    ))}
                </div>
            </div>

            {renderTabContent()}
        </div>
    );
};

export default Profile;
