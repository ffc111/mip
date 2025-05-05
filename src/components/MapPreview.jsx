import React from 'react';
import { FaMapMarkerAlt, FaHospital, FaRoute } from 'react-icons/fa';

const MapPreview = ({ 
  start = "Your Location", 
  destination = "Hospital", 
  distance = "5.0 km", 
  duration = "15 min" 
}) => {
  return (
    <div className="map-preview">
      <div className="map-preview-header">
        <div className="preview-title">Route Preview</div>
        <div className="preview-stats">
          <div className="preview-distance">{distance}</div>
          <div className="preview-divider">•</div>
          <div className="preview-duration">{duration}</div>
        </div>
      </div>
      
      <div className="route-visualization">
        <div className="route-point start">
          <div className="route-icon">
            <FaMapMarkerAlt />
          </div>
          <div className="route-label">{start}</div>
        </div>
        
        <div className="route-line">
          <FaRoute className="route-line-icon" />
        </div>
        
        <div className="route-point end">
          <div className="route-icon hospital">
            <FaHospital />
          </div>
          <div className="route-label">{destination}</div>
        </div>
      </div>
      
      <style jsx>{`
        .map-preview {
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
          padding: 16px;
          margin: 16px 0;
        }
        
        .map-preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .preview-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--dark-color);
        }
        
        .preview-stats {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: var(--primary-color);
          font-weight: 500;
        }
        
        .preview-divider {
          color: #bdc3c7;
        }
        
        .route-visualization {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .route-point {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .route-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--primary-light);
          color: var(--primary-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        
        .route-icon.hospital {
          background-color: var(--secondary-light);
          color: var(--secondary-color);
        }
        
        .route-label {
          font-size: 15px;
          font-weight: 500;
          color: var(--dark-color);
        }
        
        .route-line {
          margin-left: 20px;
          height: 40px;
          display: flex;
          position: relative;
        }
        
        .route-line:before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
        }
        
        .route-line-icon {
          position: absolute;
          left: -6px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--primary-color);
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default MapPreview;
