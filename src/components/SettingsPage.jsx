import React from 'react';
import { 
  FaMoon, 
  FaGlobe, 
  FaBell, 
  FaLock, 
  FaPhoneAlt, 
  FaIdCard,
  FaBaby,
  FaHospital,
  FaUserMd
} from 'react-icons/fa';
import { MdPregnantWoman } from 'react-icons/md';

const SettingsPage = ({ 
  darkMode, 
  setDarkMode, 
  language, 
  setLanguage,
  notificationPreference,
  setNotificationPreference
}) => {
  return (
    <div className="settings-page">
      <div className="settings-section">
        <h2 className="section-title">Appearance</h2>
        <div className="setting-item">
          <div className="setting-icon">
            <FaMoon />
          </div>
          <div className="setting-content">
            <label htmlFor="theme-select">Theme</label>
            <select 
              id="theme-select"
              value={darkMode ? "dark" : "light"} 
              onChange={(e) => setDarkMode(e.target.value === "dark")}
            >
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
            </select>
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-icon">
            <FaGlobe />
          </div>
          <div className="setting-content">
            <label htmlFor="language-select">Language</label>
            <select 
              id="language-select"
              value={language} 
              onChange={(e) => setLanguage && setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="pt">Portuguese</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="settings-section">
        <h2 className="section-title">Notifications</h2>
        <div className="setting-item">
          <div className="setting-icon">
            <FaBell />
          </div>
          <div className="setting-content">
            <label htmlFor="notification-select">Notification Preferences</label>
            <select 
              id="notification-select"
              value={notificationPreference || "all"} 
              onChange={(e) => setNotificationPreference && setNotificationPreference(e.target.value)}
            >
              <option value="all">All notifications</option>
              <option value="rides">Ride updates only</option>
              <option value="emergency">Emergency alerts only</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="settings-section">
        <h2 className="section-title">Maternal Care Profile</h2>
        <div className="setting-item">
          <div className="setting-icon maternal">
            <MdPregnantWoman />
          </div>
          <div className="setting-content">
            <label htmlFor="pregnancy-stage">Pregnancy Stage</label>
            <select id="pregnancy-stage">
              <option value="first">First Trimester</option>
              <option value="second">Second Trimester</option>
              <option value="third">Third Trimester</option>
            </select>
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-icon maternal">
            <FaBaby />
          </div>
          <div className="setting-content">
            <label htmlFor="due-date">Due Date</label>
            <input type="date" id="due-date" />
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-icon maternal">
            <FaHospital />
          </div>
          <div className="setting-content">
            <label htmlFor="preferred-hospital">Preferred Hospital</label>
            <select id="preferred-hospital">
              <option value="hospital1">Hospital da Luz Oeiras</option>
              <option value="hospital2">CUF Cascais Hospital</option>
              <option value="hospital3">Hospital São Francisco Xavier</option>
            </select>
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-icon maternal">
            <FaUserMd />
          </div>
          <div className="setting-content">
            <label htmlFor="doctor-name">Doctor's Name</label>
            <input type="text" id="doctor-name" placeholder="Enter your doctor's name" />
          </div>
        </div>
      </div>
      
      <div className="settings-section">
        <h2 className="section-title">Emergency Contacts</h2>
        <div className="setting-item">
          <div className="setting-icon">
            <FaPhoneAlt />
          </div>
          <div className="setting-content">
            <label htmlFor="primary-contact">Primary Contact</label>
            <input
              type="text"
              id="primary-contact"
              placeholder="Enter name"
            />
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-icon">
            <FaPhoneAlt />
          </div>
          <div className="setting-content">
            <label htmlFor="contact-number">Contact Number</label>
            <input
              type="tel"
              id="contact-number"
              placeholder="Enter phone number"
            />
          </div>
        </div>
      </div>
      
      <div className="settings-section">
        <h2 className="section-title">Account & Security</h2>
        <div className="setting-item">
          <div className="setting-icon">
            <FaIdCard />
          </div>
          <div className="setting-content">
            <label>Personal Information</label>
            <button className="action-button">Edit Profile</button>
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-icon">
            <FaLock />
          </div>
          <div className="setting-content">
            <label>Password & Security</label>
            <button className="action-button">Change Password</button>
          </div>
        </div>
      </div>
      
      <div className="app-version">
        UberMaternal v1.0.0
      </div>
      
      <style jsx>{`
        .settings-page {
          padding: 20px;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .settings-section {
          margin-bottom: 32px;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--primary-color);
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }
        
        .setting-item {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
        }
        
        .setting-icon {
          width: 40px;
          height: 40px;
          background-color: var(--primary-light);
          color: var(--primary-color);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          font-size: 18px;
        }
        
        .setting-icon.maternal {
          background-color: var(--secondary-light);
          color: var(--secondary-color);
        }
        
        .setting-content {
          flex: 1;
        }
        
        .setting-content label {
          display: block;
          font-size: 14px;
          color: #7f8c8d;
          margin-bottom: 6px;
        }
        
        .setting-content select,
        .setting-content input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          font-size: 15px;
          font-family: inherit;
          background-color: white;
        }
        
        .action-button {
          background-color: var(--primary-light);
          color: var(--primary-color);
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .action-button:hover {
          background-color: var(--primary-color);
          color: white;
        }
        
        .app-version {
          text-align: center;
          font-size: 12px;
          color: #95a5a6;
          margin-top: 40px;
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;
