import React from 'react';
import { motion } from 'framer-motion';
import './WeatherDetails.css';

const WeatherDetails = ({ data }) => {
  if (!data) return null;

  const details = [
    {
      icon: '💧',
      label: 'Humidity',
      value: `${data.main.humidity}%`,
      color: 'var(--accent-cyan)'
    },
    {
      icon: '💨',
      label: 'Wind Speed',
      value: `${Math.round(data.wind.speed * 3.6)} km/h`,
      color: 'var(--accent-green)'
    },
    {
      icon: '🧭',
      label: 'Wind Direction',
      value: `${data.wind.deg}°`,
      color: 'var(--accent-yellow)'
    },
    {
      icon: '🌡️',
      label: 'Pressure',
      value: `${data.main.pressure} hPa`,
      color: 'var(--accent-pink)'
    }
  ];

  return (
    <>
      {details.map((detail, index) => (
        <motion.div
          key={detail.label}
          className="detail-card"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.3 + (index * 0.1),
            type: "spring",
            stiffness: 100 
          }}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <div className="detail-content">
            <div className="detail-icon-container">
              <span className="detail-icon">
                {detail.icon}
              </span>
            </div>

            <div className="detail-info">
              <div className="detail-label">
                {detail.label}
              </div>
              <div 
                className="detail-value"
                style={{ color: detail.color }}
              >
                {detail.value}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default WeatherDetails;
