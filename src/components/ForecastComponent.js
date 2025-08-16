import React from 'react';
import { motion } from 'framer-motion';
import './ForecastComponent.css';

const ForecastComponent = ({ data }) => {
  if (!data) return null;

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'clear': '☀️',
      'clouds': '☁️',
      'rain': '🌧️',
      'snow': '❄️',
      'thunderstorm': '⛈️',
      'drizzle': '🌦️',
      'mist': '🌫️',
      'fog': '🌫️',
      'haze': '🌫️'
    };

    return iconMap[condition.toLowerCase()] || '🌤️';
  };

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    }
  };

  return (
    <motion.div
      className="forecast-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="forecast-header">
        <h3 className="forecast-title">5-Day Forecast</h3>
      </div>

      <div className="forecast-grid">
        {data.map((day, index) => (
          <motion.div
            key={index}
            className="forecast-card glass-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ 
              scale: 1.02,
              y: -5
            }}
          >
            <div className="forecast-day">
              {getDayName(day.dt_txt)}
            </div>

            <motion.div 
              className="forecast-icon"
              animate={{
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.2
              }}
            >
              {getWeatherIcon(day.weather[0].main)}
            </motion.div>

            <div className="forecast-temps">
              <div className="temp-high">
                {Math.round(day.main.temp_max)}°
              </div>
              <div className="temp-low">
                {Math.round(day.main.temp_min)}°
              </div>
            </div>

            <div className="forecast-condition">
              {day.weather[0].description}
            </div>

            <div className="forecast-details">
              <div className="forecast-detail">
                <span className="detail-icon">💧</span>
                <span>{day.main.humidity}%</span>
              </div>
              <div className="forecast-detail">
                <span className="detail-icon">💨</span>
                <span>{Math.round(day.wind.speed * 3.6)} km/h</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ForecastComponent;
