import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const ProfileButton = ({ onClick, userName = "Sarah" }) => {
  return (
    <button 
      className="profile-button" 
      onClick={onClick}
      aria-label="Open Profile Menu"
    >
      <div className="profile-icon">
        <FaUserCircle />
      </div>
      <div className="profile-name">
        {userName}
      </div>
      
      <style jsx>{`
        .profile-button {
          display: flex;
          align-items: center;
          background-color: white;
          border: none;
          border-radius: 24px;
          padding: 8px 16px;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .profile-button:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }
        
        .profile-icon {
          font-size: 24px;
          color: var(--primary-color);
          margin-right: 8px;
        }
        
        .profile-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--dark-color);
        }
        
        @media (max-width: 480px) {
          .profile-name {
            display: none;
          }
          
          .profile-button {
            padding: 8px;
          }
          
          .profile-icon {
            margin-right: 0;
          }
        }
      `}</style>
    </button>
  );
};

export default ProfileButton;
