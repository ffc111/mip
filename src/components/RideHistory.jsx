import React from 'react';
import { FaMapMarkerAlt, FaHospital, FaCalendarAlt, FaClock, FaRoad } from 'react-icons/fa';

const RideHistory = ({ rides = [] }) => {
  // Group rides by date (today, yesterday, earlier this week, etc.)
  const groupRidesByDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    
    const groups = {
      today: [],
      yesterday: [],
      thisWeek: [],
      thisMonth: [],
      earlier: []
    };
    
    rides.forEach(ride => {
      const rideDate = new Date(ride.date);
      rideDate.setHours(0, 0, 0, 0);
      
      if (rideDate.getTime() === today.getTime()) {
        groups.today.push(ride);
      } else if (rideDate.getTime() === yesterday.getTime()) {
        groups.yesterday.push(ride);
      } else if (rideDate >= lastWeekStart) {
        groups.thisWeek.push(ride);
      } else if (rideDate >= thisMonthStart) {
        groups.thisMonth.push(ride);
      } else {
        groups.earlier.push(ride);
      }
    });
    
    return groups;
  };
  
  const groupedRides = groupRidesByDate();
  
  // Format time from date object
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const renderRideGroup = (rides, title) => {
    if (rides.length === 0) return null;
    
    return (
      <div className="ride-group">
        <h3 className="group-title">{title}</h3>
        <div className="rides-list">
          {rides.map((ride, index) => (
            <div key={index} className="ride-card">
              <div className="ride-time">
                <FaClock className="time-icon" />
                {formatTime(new Date(ride.date))}
              </div>
              
              <div className="ride-route">
                <div className="route-point">
                  <div className="point-icon start">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="point-name">{ride.from}</div>
                </div>
                
                <div className="route-line"></div>
                
                <div className="route-point">
                  <div className="point-icon end">
                    <FaHospital />
                  </div>
                  <div className="point-name">{ride.to}</div>
                </div>
              </div>
              
              <div className="ride-details">
                <div className="detail-item">
                  <FaRoad className="detail-icon" />
                  <span>{ride.distance} km</span>
                </div>
                <div className="detail-item">
                  <FaClock className="detail-icon" />
                  <span>{ride.duration} min</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="ride-history">
      {rides.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🚑</div>
          <h3>No Rides Yet</h3>
          <p>Your maternal care transport history will appear here</p>
        </div>
      ) : (
        <>
          {renderRideGroup(groupedRides.today, 'Today')}
          {renderRideGroup(groupedRides.yesterday, 'Yesterday')}
          {renderRideGroup(groupedRides.thisWeek, 'This Week')}
          {renderRideGroup(groupedRides.thisMonth, 'This Month')}
          {renderRideGroup(groupedRides.earlier, 'Earlier')}
        </>
      )}
      
      <style jsx>{`
        .ride-history {
          padding: 16px;
        }
        
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 16px;
          text-align: center;
          color: #8395a7;
        }
        
        .empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .empty-state h3 {
          font-size: 20px;
          margin-bottom: 8px;
          color: var(--dark-color);
        }
        
        .empty-state p {
          font-size: 15px;
          max-width: 240px;
        }
        
        .ride-group {
          margin-bottom: 24px;
        }
        
        .group-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--primary-color);
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }
        
        .rides-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .ride-card {
          background-color: white;
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        
        .ride-time {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #8395a7;
          margin-bottom: 12px;
        }
        
        .time-icon {
          font-size: 12px;
        }
        
        .ride-route {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }
        
        .route-point {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .point-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }
        
        .point-icon.start {
          background-color: var(--primary-light);
          color: var(--primary-color);
        }
        
        .point-icon.end {
          background-color: var(--secondary-light);
          color: var(--secondary-color);
        }
        
        .point-name {
          font-size: 15px;
          font-weight: 500;
        }
        
        .route-line {
          width: 2px;
          height: 24px;
          background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
          margin-left: 16px;
        }
        
        .ride-details {
          display: flex;
          gap: 16px;
          padding: 10px;
          background-color: var(--light-color);
          border-radius: 8px;
        }
        
        .detail-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          color: var(--primary-color);
        }
        
        .detail-icon {
          font-size: 12px;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default RideHistory;

