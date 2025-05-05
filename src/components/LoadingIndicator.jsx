import React from 'react';

const LoadingIndicator = ({ size = 'medium', color = 'primary', text }) => {
  // Size values in pixels
  const sizeMap = {
    small: { spinner: 16, thickness: 2 },
    medium: { spinner: 24, thickness: 3 },
    large: { spinner: 36, thickness: 4 }
  };
  
  // Colors
  const colorMap = {
    primary: 'var(--primary-color)',
    secondary: 'var(--secondary-color)',
    light: '#ffffff'
  };
  
  const spinnerSize = sizeMap[size]?.spinner || sizeMap.medium.spinner;
  const borderThickness = sizeMap[size]?.thickness || sizeMap.medium.thickness;
  const spinnerColor = colorMap[color] || colorMap.primary;
  
  return (
    <div className="loading-indicator">
      <div 
        className="spinner"
        style={{
          width: `${spinnerSize}px`,
          height: `${spinnerSize}px`,
          borderWidth: `${borderThickness}px`,
          borderTopColor: spinnerColor
        }}
      ></div>
      
      {text && <div className="loading-text">{text}</div>}
      
      <style jsx>{`
        .loading-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: ${text ? 'column' : 'row'};
          gap: 12px;
        }
        
        .spinner {
          border-radius: 50%;
          border-style: solid;
          border-color: rgba(0, 0, 0, 0.1);
          border-top-style: solid;
          animation: spin 1s linear infinite;
        }
        
        .loading-text {
          font-size: 14px;
          font-weight: 500;
          color: ${spinnerColor};
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingIndicator; 