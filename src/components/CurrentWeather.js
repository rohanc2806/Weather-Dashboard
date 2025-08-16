import React from 'react';
import { motion } from 'framer-motion';
import './CurrentWeather.css';

const CurrentWeather = ({ data }) => {
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

    const weatherMain = data.weather[0].main.toLowerCase();
    return iconMap[weatherMain] || '🌤️';
  };

  const temperature = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const condition = data.weather[0].description;
  const location = `${data.name}, ${data.sys.country}`;

  return (
    <div className="current-weather">
      <motion.div
        className="weather-hero"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Weather Icon Section */}
        <motion.div
          className="weather-icon-section"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="weather-icon-glow" />
          <div className="weather-icon">
            {getWeatherIcon()}
          </div>
        </motion.div>

        {/* Main Weather Info */}
        <motion.div
          className="weather-main-info"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Temperature Display */}
          <div className="temperature-display">
            <motion.div
              className="temperature"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.8,
                type: "spring",
                stiffness: 100
              }}
            >
              {temperature}°C
            </motion.div>

            <motion.div
              className="feels-like"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              Feels like {feelsLike}°C
            </motion.div>
          </div>

          {/* Location Info */}
          <motion.div
            className="location-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="location">
              <span className="location-icon">📍</span>
              {location}
            </div>

            <div className="condition">
              {condition.charAt(0).toUpperCase() + condition.slice(1)}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CurrentWeather;
