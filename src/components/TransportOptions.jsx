import React from 'react';
import { FaAmbulance, FaWheelchair, FaNotesMedical } from 'react-icons/fa';
import { MdPregnantWoman, MdHealthAndSafety } from 'react-icons/md';
import { RiNurseLine } from 'react-icons/ri';

const TransportOptions = ({ selected, setSelected }) => {
  const options = [
    { 
      id: 1, 
      name: 'Maternal Transport',
      description: 'Specialized care for pregnant women',
      icon: <MdPregnantWoman />,
      color: '#ff9ff3'
    },
    { 
      id: 2, 
      name: 'Nurse Escort',
      description: 'Private nurse accompaniment',
      icon: <RiNurseLine />,
      color: '#6c5ce7'
    },
    { 
      id: 3, 
      name: 'Medical Transport',
      description: 'Standard medical vehicle',
      icon: <FaAmbulance />,
      color: '#54a0ff'
    },
    { 
      id: 4, 
      name: 'Wheelchair Access',
      description: 'Accessible vehicle service',
      icon: <FaWheelchair />,
      color: '#00b894'
    },
  ];

  return (
    <div className="transport-options-container">
      <h3 className="options-title">Choose Your Transport</h3>
      <div className="options-grid">
        {options.map((option) => (
          <button
            key={option.id}
            className={`transport-option ${selected === option.id ? 'selected' : ''}`}
            onClick={() => setSelected(option.id)}
            style={{
              '--option-color': option.color,
              '--option-bg': `${option.color}15`
            }}
          >
            <div className="option-icon-container">
              {option.icon}
            </div>
            <div className="option-details">
              <div className="option-name">{option.name}</div>
              <div className="option-description">{option.description}</div>
            </div>
          </button>
        ))}
      </div>
      
      <style jsx>{`
        .transport-options-container {
          padding: 20px;
          margin-bottom: 24px;
        }
        
        .options-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          color: var(--primary-color);
        }
        
        .options-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        
        .transport-option {
          display: flex;
          align-items: center;
          padding: 16px;
          border-radius: 16px;
          background-color: white;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }
        
        .transport-option:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
        }
        
        .transport-option.selected {
          border-color: var(--option-color);
          background-color: var(--option-bg);
        }
        
        .option-icon-container {
          font-size: 24px;
          color: var(--option-color);
          margin-right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background-color: var(--option-bg);
        }
        
        .option-details {
          flex: 1;
        }
        
        .option-name {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .option-description {
          font-size: 12px;
          color: #718093;
        }
        
        @media (max-width: 480px) {
          .options-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default TransportOptions;
