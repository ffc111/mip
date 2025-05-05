// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import MapComponent from './components/MapComponent';
import {
  FaPhoneAlt,
  FaAmbulance,
  FaHospital,
  FaMapMarkerAlt,
  FaUserCircle,
  FaBell,
  FaHistory,
  FaCog,
  FaArrowLeft,
  FaMoon,
  FaSun,
  FaGlobe,
  FaExclamationTriangle,
  FaCommentDots,
  FaGraduationCap,
  FaClock,
  FaStar,
  FaTimes,
  FaInfoCircle,
  FaBaby,
  FaHeart,
  FaShieldAlt,
  FaSave,
  FaCheckCircle
} from "react-icons/fa";
import { RiTimerFill, RiHandHeartLine } from "react-icons/ri";
import { MdDirectionsCar, MdHealthAndSafety, MdPregnantWoman } from "react-icons/md";

const App = () => {
  // Locations
  const [currentLocation] = useState({
    latitude: 38.679620,
    longitude: -9.326610,
    name: "Nova School of Business"
  });
  
  const [hospitalLocation] = useState({
    latitude: 38.701596,
    longitude: -9.305014,
    name: "Hospital da Luz Oeiras"
  });

  // App state
  const [loading, setLoading] = useState(false);
  const [ambulanceLocation, setAmbulanceLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [time, setTime] = useState(null);
  const [progress, setProgress] = useState(0);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeView, setActiveView] = useState('map');
  const [emergencyType, setEmergencyType] = useState('maternal');
  const [estimatedArrival, setEstimatedArrival] = useState(null);
  const [driverInfo, setDriverInfo] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [rideHistory, setRideHistory] = useState([]);
  const intervalRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showPanicButton, setShowPanicButton] = useState(true);
  const [panicMode, setPanicMode] = useState(false);
  const [showDriverProfile, setShowDriverProfile] = useState(false);
  const [showMaternalSupport, setShowMaternalSupport] = useState(false);
  const [loadingState, setLoadingState] = useState('idle'); // idle, loading, success, error
  const [emergencyContact, setEmergencyContact] = useState(() => {
    const saved = localStorage.getItem('emergencyContact');
    return saved ? JSON.parse(saved) : { name: '', number: '' };
  });
  const [showEmergencyOptions, setShowEmergencyOptions] = useState(false);
  const [contactSaveMessage, setContactSaveMessage] = useState({ show: false, text: '' });

  // Calculate route coordinates
  useEffect(() => {
    const calculateRoute = () => {
      const steps = 100;
      const coordinates = [];
      for (let i = 0; i <= steps; i++) {
        const ratio = i / steps;
        const lat = hospitalLocation.latitude + (currentLocation.latitude - hospitalLocation.latitude) * ratio;
        const lng = hospitalLocation.longitude + (currentLocation.longitude - hospitalLocation.longitude) * ratio;
        coordinates.push({ latitude: lat, longitude: lng });
      }
      setRouteCoordinates(coordinates);
    };
    calculateRoute();
  }, [currentLocation, hospitalLocation]);

  // Simulate ambulance movement
  const startAmbulanceJourney = () => {
    clearInterval(intervalRef.current);
    setProgress(0);
    
    // Generate random driver info with more details
    setDriverInfo({
      name: ["Ana Silva", "Miguel Oliveira", "Sofia Costa", "Pedro Santos"][Math.floor(Math.random() * 4)],
      rating: (4 + Math.random()).toFixed(1),
      vehicle: "Ambulance #" + Math.floor(1000 + Math.random() * 9000),
      phone: "+351 91" + Math.floor(1000000 + Math.random() * 9000000),
      experience: Math.floor(3 + Math.random() * 7) + " years",
      training: [
        "Advanced Life Support",
        "Obstetric Emergency Care",
        "Pediatric Advanced Life Support",
        "Emergency Vehicle Operations"
      ],
      completedRides: Math.floor(100 + Math.random() * 900),
      languages: ["Portuguese", "English", "Spanish"],
      certifications: [
        "Emergency Medical Technician",
        "Advanced Cardiac Life Support",
        "Maternal Emergency Care Specialist"
      ]
    });

    // Set initial estimates
    const initialDistance = (5 + Math.random() * 2).toFixed(1);
    const initialTime = Math.floor(10 + Math.random() * 10);
    setDistance(`${initialDistance} km`);
    setTime(`${initialTime} min`);
    
    // Calculate arrival time
    const now = new Date();
    now.setMinutes(now.getMinutes() + initialTime);
    setEstimatedArrival(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          clearInterval(intervalRef.current);
          setLoading(false);
          
          // Add to ride history
          setRideHistory(prev => [
            ...prev,
            {
              date: new Date(),
              from: currentLocation.name,
              to: hospitalLocation.name,
              distance: initialDistance,
              duration: initialTime
            }
          ]);
          
          return 100;
        }
        
        // Update ambulance location
        setAmbulanceLocation(routeCoordinates[newProgress]);
        
        // Update ETA dynamically
        if (newProgress % 10 === 0) {
          const remainingTime = Math.floor((initialTime * (100 - newProgress)) / 100);
          setTime(`${remainingTime} min`);
        }
        
        return newProgress;
      });
    }, 100);
  };

  const handleRequest = () => {
    setShowConfirmation(true);
  };

  const confirmRequest = () => {
    setShowConfirmation(false);
    setLoading(true);
    setLoadingState('loading');
    setAmbulanceLocation(hospitalLocation);
    
    // Simulate API call with loading state
    setTimeout(() => {
      setLoadingState('success');
      startAmbulanceJourney();
    }, 2000);
  };

  const cancelRequest = () => {
    setShowConfirmation(false);
  };

  const cancelRide = () => {
    clearInterval(intervalRef.current);
    setAmbulanceLocation(null);
    setProgress(0);
    setLoading(false);
    setLoadingState('idle');
  };

  const handlePanicButton = () => {
    setPanicMode(true);
    // Show emergency options instead of directly dialing
    setShowEmergencyOptions(true);
  };

  const callEmergency = (number) => {
    window.location.href = `tel:${number}`;
    setShowEmergencyOptions(false);
  };

  const saveEmergencyContact = (name, number) => {
    const newContact = { name, number };
    setEmergencyContact(newContact);
    localStorage.setItem('emergencyContact', JSON.stringify(newContact));
    
    // Show confirmation message
    setContactSaveMessage({ 
      show: true, 
      text: `Emergency contact ${name} saved successfully!` 
    });
    
    // Hide message after 3 seconds
    setTimeout(() => {
      setContactSaveMessage({ show: false, text: '' });
    }, 3000);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
      // Simulate driver response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'I will be there shortly. Please stay calm.', sender: 'driver' }]);
      }, 2000);
    }
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          {activeView !== 'map' && (
            <button className="icon-button" onClick={() => setActiveView('map')}>
              <FaArrowLeft />
            </button>
          )}
          <h1 className="app-title">UberMaternal</h1>
        </div>
        <div className="header-right">
          <button className="icon-button" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button className="icon-button" onClick={() => setShowSidebar(!showSidebar)}>
            <FaUserCircle />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {activeView === 'map' && (
          <>
            <MapComponent
              currentLocation={currentLocation}
              hospitalLocation={hospitalLocation}
              ambulanceLocation={ambulanceLocation}
              showRoute={!!ambulanceLocation}
            />
            
            {/* Location Card */}
            <div className="location-card">
              <div className="location-pin">
                <div className="pin-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="location-text">
                  <div className="location-title">Current Location</div>
                  <div className="location-address">{currentLocation.name}</div>
                </div>
              </div>
              <div className="location-pin">
                <div className="pin-icon hospital">
                  <FaHospital />
                </div>
                <div className="location-text">
                  <div className="location-title">Destination</div>
                  <div className="location-address">{hospitalLocation.name}</div>
                </div>
              </div>
            </div>

            {/* Emergency Type Selector - Only show when no ambulance is en route */}
            {!ambulanceLocation && (
              <div className="emergency-type-selector">
                <div 
                  className={`emergency-option ${emergencyType === 'maternal' ? 'active' : ''}`}
                  onClick={() => setEmergencyType('maternal')}
                >
                  <div className="option-icon maternal">
                    <MdPregnantWoman />
                  </div>
                  <div className="option-label">Maternal Care</div>
                  <div className="option-description">Specialized for expectant mothers</div>
                </div>
                <div 
                  className={`emergency-option ${emergencyType === 'general' ? 'active' : ''}`}
                  onClick={() => setEmergencyType('general')}
                >
                  <div className="option-icon general">
                    <MdDirectionsCar />
                  </div>
                  <div className="option-label">General Transport</div>
                  <div className="option-description">Standard medical transport</div>
                </div>
              </div>
            )}

            {/* Panic Button */}
            {showPanicButton && (
              <button className="panic-button" onClick={handlePanicButton}>
                <FaExclamationTriangle />
                <span>SOS</span>
              </button>
            )}

            {/* Emergency Options Modal */}
            {showEmergencyOptions && (
              <div className="modal-overlay" onClick={() => setShowEmergencyOptions(false)}>
                <div className="emergency-options-modal" onClick={e => e.stopPropagation()}>
                  <div className="modal-header">
                    <h2>Emergency Options</h2>
                    <button className="close-button" onClick={() => setShowEmergencyOptions(false)}>
                      <FaTimes />
                    </button>
                  </div>
                  <div className="emergency-options-content">
                    <button className="emergency-call-button" onClick={() => callEmergency('112')}>
                      <FaPhoneAlt /> Call Emergency Services (112)
                    </button>
                    
                    {emergencyContact.name && emergencyContact.number ? (
                      <button className="emergency-call-button contact" onClick={() => callEmergency(emergencyContact.number)}>
                        <FaPhoneAlt /> Call {emergencyContact.name} ({emergencyContact.number})
                      </button>
                    ) : (
                      <div className="no-contact-message">
                        <FaInfoCircle /> No emergency contact added. Add one in Settings or Maternal Support.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Chat Button */}
            {ambulanceLocation && (
              <button className="chat-button" onClick={() => setShowChat(!showChat)}>
                <FaCommentDots />
              </button>
            )}

            {/* Chat Interface */}
            {showChat && (
              <div className="modal-overlay" onClick={() => setShowChat(false)}>
                <div className="chat-modal" onClick={e => e.stopPropagation()}>
                  <div className="modal-header">
                    <h2>Chat with Driver</h2>
                    <button className="close-button" onClick={() => setShowChat(false)}>
                      <FaTimes />
                    </button>
                  </div>
                  <div className="chat-container">
                    <div className="chat-messages">
                      {messages.length === 0 ? (
                        <div className="empty-chat-message">
                          <FaCommentDots />
                          <p>Send a message to your driver</p>
                        </div>
                      ) : (
                        messages.map((msg, index) => (
                          <div key={index} className={`message ${msg.sender}`}>
                            {msg.text}
                          </div>
                        ))
                      )}
                    </div>
                    <div className="chat-input">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                      />
                      <button onClick={sendMessage}>
                        <FaCommentDots /> Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Driver Profile Modal */}
            {showDriverProfile && driverInfo && (
              <div className="modal-overlay" onClick={() => setShowDriverProfile(false)}>
                <div className="driver-profile-modal" onClick={e => e.stopPropagation()}>
                  <div className="modal-header">
                    <h2>Driver Profile</h2>
                    <button className="close-button" onClick={() => setShowDriverProfile(false)}>
                      <FaTimes />
                    </button>
                  </div>
                  <div className="driver-profile-content">
                    <div className="driver-basic-info">
                      <div className="driver-avatar">
                        <FaUserCircle />
                      </div>
                      <div className="driver-name-rating">
                        <h3>{driverInfo.name}</h3>
                        <div className="driver-rating">
                          <FaStar /> {driverInfo.rating}
                        </div>
                      </div>
                    </div>
                    
                    <div className="driver-details-section">
                      <h4>Experience & Training</h4>
                      <div className="detail-item">
                        <FaClock />
                        <span>{driverInfo.experience} of experience</span>
                      </div>
                      <div className="detail-item">
                        <FaGraduationCap />
                        <span>{driverInfo.completedRides} completed rides</span>
                      </div>
                    </div>

                    <div className="driver-details-section">
                      <h4>Certifications</h4>
                      <ul className="certifications-list">
                        {driverInfo.certifications.map((cert, index) => (
                          <li key={index}>{cert}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="driver-details-section">
                      <h4>Specialized Training</h4>
                      <ul className="training-list">
                        {driverInfo.training.map((train, index) => (
                          <li key={index}>{train}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="driver-details-section">
                      <h4>Languages</h4>
                      <div className="languages-list">
                        {driverInfo.languages.map((lang, index) => (
                          <span key={index} className="language-tag">{lang}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Ride Status Container */}
            {ambulanceLocation && (
              <div className="ride-status-container">
                <div className="driver-info">
                  <div className="driver-avatar">
                    <FaUserCircle />
                  </div>
                  <div className="driver-details">
                    <div className="driver-name-container">
                      <div className="driver-name">
                        {driverInfo?.name} <span className="driver-rating">★ {driverInfo?.rating}</span>
                      </div>
                      <button 
                        className="view-profile-button"
                        onClick={() => setShowDriverProfile(true)}
                        aria-label="View Driver Profile"
                      >
                        View Profile
                      </button>
                    </div>
                    <div className="driver-vehicle">{driverInfo?.vehicle}</div>
                  </div>
                  <div className="driver-eta">
                    <RiTimerFill /> {time}
                  </div>
                </div>
                
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
                
                <div className="status-details">
                  <div className="status-item">
                    <span>Distance</span>
                    <span>{distance}</span>
                  </div>
                  <div className="status-item">
                    <span>Arrival</span>
                    <span>{estimatedArrival}</span>
                  </div>
                </div>
                
                <button className="cancel-ride-button" onClick={cancelRide}>
                  Cancel Ride
                </button>
              </div>
            )}
          </>
        )}

        {activeView === 'history' && (
          <div className="history-view">
            <h2 className="view-title">Ride History</h2>
            {rideHistory.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <FaHistory />
                </div>
                <h3>No Rides Yet</h3>
                <p>Your maternal care transport history will appear here</p>
              </div>
            ) : (
              <div className="history-list-container">
                <ul className="history-list">
                  {rideHistory.map((ride, index) => (
                    <li key={index} className="history-card">
                      <div className="history-card-header">
                        <span className="history-date">{ride.date.toLocaleDateString()}</span>
                        <span className="history-time">{ride.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="history-route">
                        <div className="route-point">
                          <div className="route-marker start"></div>
                          <div className="route-location">{ride.from}</div>
                        </div>
                        <div className="route-divider"></div>
                        <div className="route-point">
                          <div className="route-marker end"></div>
                          <div className="route-location">{ride.to}</div>
                        </div>
                      </div>
                      <div className="history-details">
                        <div className="detail-item">
                          <FaMapMarkerAlt />
                          <span>{ride.distance} km</span>
                        </div>
                        <div className="detail-item">
                          <FaClock />
                          <span>{ride.duration} min</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeView === 'settings' && (
          <div className="settings-view">
            <h2 className="view-title">Settings</h2>
            
            <div className="settings-cards">
              <div className="settings-card">
                <div className="settings-card-header">
                  <FaSun className="settings-icon" />
                  <h3>Appearance</h3>
                </div>
                <div className="settings-card-content">
                  <div className="setting-item">
                    <label>Theme</label>
                    <div className="toggle-container">
                      <button 
                        className={`toggle-button ${!darkMode ? 'active' : ''}`}
                        onClick={() => setDarkMode(false)}
                      >
                        <FaSun /> Light
                      </button>
                      <button 
                        className={`toggle-button ${darkMode ? 'active' : ''}`}
                        onClick={() => setDarkMode(true)}
                      >
                        <FaMoon /> Dark
                      </button>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <label>Language</label>
                    <select 
                      value={language} 
                      onChange={(e) => setLanguage(e.target.value)}
                      className="settings-select"
                    >
                      <option value="en">English</option>
                      <option value="pt">Portuguese</option>
                      <option value="es">Spanish</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="settings-card">
                <div className="settings-card-header">
                  <FaBell className="settings-icon" />
                  <h3>Notifications</h3>
                </div>
                <div className="settings-card-content">
                  <div className="setting-item">
                    <label>Notification Preferences</label>
                    <select className="settings-select">
                      <option>All notifications</option>
                      <option>Ride updates only</option>
                      <option>Emergency alerts only</option>
                      <option>None</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="settings-card">
                <div className="settings-card-header">
                  <FaPhoneAlt className="settings-icon" />
                  <h3>Emergency Contact</h3>
                </div>
                <div className="settings-card-content">
                  <div className="setting-item">
                    <label>Contact Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter name" 
                      className="settings-input"
                      value={emergencyContact.name}
                      onChange={(e) => setEmergencyContact({...emergencyContact, name: e.target.value})}
                    />
                  </div>
                  <div className="setting-item">
                    <label>Contact Number</label>
                    <input 
                      type="tel" 
                      placeholder="Enter phone number" 
                      className="settings-input"
                      value={emergencyContact.number}
                      onChange={(e) => setEmergencyContact({...emergencyContact, number: e.target.value})}
                    />
                  </div>
                  {contactSaveMessage.show && (
                    <div className="save-confirmation-message">
                      <FaCheckCircle />
                      <span>{contactSaveMessage.text}</span>
                    </div>
                  )}
                  <button 
                    className="save-contact-button"
                    onClick={() => saveEmergencyContact(emergencyContact.name, emergencyContact.number)}
                    disabled={!emergencyContact.name || !emergencyContact.number}
                  >
                    <FaSave /> Save Emergency Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Maternal Support Page View */}
        {activeView === 'maternal-support' && (
          <div className="maternal-support-view">
            <h2 className="view-title">Maternal Support</h2>
            
            <div className="support-card">
              <div className="card-header">
                <FaBaby className="header-icon" />
                <h3>Pregnancy Care</h3>
              </div>
              <div className="card-content">
                <h4>Comfortable Positions</h4>
                <ul className="support-list">
                  <li>Kneel on all fours with your back straight</li>
                  <li>Sit on a birthing ball with your legs wide apart</li>
                  <li>Lie on your side with a pillow between your knees</li>
                  <li>Stand and lean forward on a support</li>
                </ul>

                <h4>Breathing Techniques</h4>
                <ul className="support-list">
                  <li>Take slow, deep breaths through your nose</li>
                  <li>Exhale slowly through pursed lips</li>
                  <li>Focus on relaxing your body with each breath</li>
                  <li>Practice rhythmic breathing patterns</li>
                </ul>
              </div>
            </div>

            <div className="support-card">
              <div className="card-header">
                <FaHeart className="header-icon" />
                <h3>Mental Wellbeing</h3>
              </div>
              <div className="card-content">
                <h4>Staying Calm</h4>
                <ul className="support-list">
                  <li>Focus on one contraction at a time</li>
                  <li>Use visualization techniques</li>
                  <li>Listen to calming music</li>
                  <li>Have your support person massage your back</li>
                </ul>
                
                <p className="support-tip">
                  <FaInfoCircle /> Regular meditation can help reduce anxiety during pregnancy. Try a few minutes each day.
                </p>
              </div>
            </div>

            <div className="support-card">
              <div className="card-header">
                <FaAmbulance className="header-icon" />
                <h3>Emergency Preparedness</h3>
              </div>
              <div className="card-content">
                <h4>What to Prepare</h4>
                <ul className="support-list">
                  <li>Keep your hospital bag ready at all times</li>
                  <li>Have important documents easily accessible</li>
                  <li>Keep emergency contacts on speed dial</li>
                  <li>Know the fastest route to your hospital</li>
                </ul>
                
                <div className="settings-card-content emergency-contact-section">
                  <h4>Emergency Contact</h4>
                  <div className="setting-item">
                    <label>Contact Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter name" 
                      className="settings-input"
                      value={emergencyContact.name}
                      onChange={(e) => setEmergencyContact({...emergencyContact, name: e.target.value})}
                    />
                  </div>
                  <div className="setting-item">
                    <label>Contact Number</label>
                    <input 
                      type="tel" 
                      placeholder="Enter phone number" 
                      className="settings-input"
                      value={emergencyContact.number}
                      onChange={(e) => setEmergencyContact({...emergencyContact, number: e.target.value})}
                    />
                  </div>
                  {contactSaveMessage.show && (
                    <div className="save-confirmation-message">
                      <FaCheckCircle />
                      <span>{contactSaveMessage.text}</span>
                    </div>
                  )}
                  <button 
                    className="save-contact-button"
                    onClick={() => saveEmergencyContact(emergencyContact.name, emergencyContact.number)}
                    disabled={!emergencyContact.name || !emergencyContact.number}
                  >
                    <FaSave /> Save Emergency Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer / Action Panel */}
      <footer className={`app-footer ${ambulanceLocation ? 'hidden' : ''}`}>
        {!ambulanceLocation && (
          <>
            {showConfirmation ? (
              <div className="confirmation-dialog">
                <h3>Confirm Transport Request</h3>
                <p>You are about to request maternal care transport to {hospitalLocation.name}</p>
                <div className="confirmation-buttons">
                  <button className="cancel-button" onClick={cancelRequest}>
                    Cancel
                  </button>
                  <button className="confirm-button" onClick={confirmRequest}>
                    Confirm
                  </button>
                </div>
              </div>
            ) : (
              <button
                className={`request-button ${loadingState === 'loading' ? 'loading' : ''}`}
                onClick={handleRequest}
                disabled={loadingState === 'loading'}
              >
                {loadingState === 'loading' ? (
                  <>
                    <div className="loading-spinner"></div>
                    Connecting...
                  </>
                ) : (
                  <>
                    <RiHandHeartLine className="button-icon" />
                    Request Maternal Care Transport
                  </>
                )}
              </button>
            )}
          </>
        )}
      </footer>

      {/* Sidebar Navigation */}
      {showSidebar && (
        <div className="sidebar-overlay" onClick={() => setShowSidebar(false)}>
          <div className="sidebar" onClick={e => e.stopPropagation()}>
            <div className="sidebar-header">
              <div className="user-avatar">
                <FaUserCircle />
              </div>
              <div className="user-info">
                <div className="user-name">Sarah Johnson</div>
                <div className="user-email">sarah@example.com</div>
              </div>
            </div>
            
            <nav className="sidebar-nav">
              <button 
                className={`nav-item ${activeView === 'map' ? 'active' : ''}`}
                onClick={() => {
                  setActiveView('map');
                  setShowSidebar(false);
                }}
              >
                <FaMapMarkerAlt /> Home
              </button>
              <button 
                className={`nav-item ${activeView === 'history' ? 'active' : ''}`}
                onClick={() => {
                  setActiveView('history');
                  setShowSidebar(false);
                }}
              >
                <FaHistory /> Ride History
              </button>
              <button 
                className={`nav-item ${activeView === 'settings' ? 'active' : ''}`}
                onClick={() => {
                  setActiveView('settings');
                  setShowSidebar(false);
                }}
              >
                <FaCog /> Settings
              </button>
              <button 
                className={`nav-item ${activeView === 'maternal-support' ? 'active' : ''}`}
                onClick={() => {
                  setActiveView('maternal-support');
                  setShowSidebar(false);
                }}
              >
                <FaBaby /> Maternal Support
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;