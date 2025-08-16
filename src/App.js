import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import SearchComponent from './components/SearchComponent';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import ForecastComponent from './components/ForecastComponent';
import LoadingSpinner from './components/LoadingSpinner';

// OpenWeatherMap API configuration
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.openweathermap.org/data/2.5';
// const DEFAULT_CITY = process.env.REACT_APP_DEFAULT_CITY || 'London';
const DEFAULT_CITY = process.env.REACT_APP_DEFAULT_CITY || 'Hyderabad';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState(DEFAULT_CITY);

  // Check if API key is provided
  useEffect(() => {
    if (!API_KEY) {
      setError('Please add your OpenWeatherMap API key to the .env file');
      return;
    }
  }, []);

  // Fetch weather data from OpenWeatherMap API
  const fetchWeatherData = async (cityName) => {
    if (!API_KEY) {
      setError('API key is missing. Please check your .env file.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Fetch current weather
      const weatherResponse = await fetch(
        `${API_BASE_URL}/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
      );

      if (!weatherResponse.ok) {
        if (weatherResponse.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.');
        } else if (weatherResponse.status === 401) {
          throw new Error('Invalid API key. Please check your .env file.');
        } else {
          throw new Error('Unable to fetch weather data. Please try again later.');
        }
      }

      const currentWeather = await weatherResponse.json();

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `${API_BASE_URL}/forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
      );

      if (!forecastResponse.ok) {
        console.warn('Forecast data unavailable');
        setWeatherData(currentWeather);
        setForecastData(null);
        return;
      }

      const forecastJson = await forecastResponse.json();

      // Process forecast data (get daily forecasts)
      const dailyForecasts = forecastJson.list.filter((item, index) => 
        index % 8 === 0 // Every 8th item (24 hours apart)
      ).slice(0, 5);

      setWeatherData(currentWeather);
      setForecastData(dailyForecasts);

    } catch (err) {
      console.error('Weather fetch error:', err);
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  // Load weather data on component mount and when city changes
  useEffect(() => {
    if (API_KEY) {
      fetchWeatherData(city);
    }
  }, [city]);

  // Handle search
  const handleSearch = (searchCity) => {
    if (searchCity && searchCity.trim()) {
      setCity(searchCity.trim());
    }
  };

  // Show API key warning if not provided
  if (!API_KEY) {
    return (
      <div className="app">
        <div className="app-container">
          <motion.div
            className="error-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="error-icon">🔑</div>
            <h2>API Key Required</h2>
            <p>To use this weather dashboard, you need to:</p>
            <ol style={{ 
              textAlign: 'left', 
              margin: 'var(--space-lg) 0',
              paddingLeft: 'var(--space-lg)',
              color: 'var(--text-secondary)' 
            }}>
              <li>Get a free API key from <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">OpenWeatherMap</a></li>
              <li>Create a <code style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: '2px 6px', 
                borderRadius: '4px' 
              }}>.env</code> file in your project root</li>
              <li>Add: <code style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: '2px 6px', 
                borderRadius: '4px' 
              }}>REACT_APP_WEATHER_API_KEY=your_key_here</code></li>
              <li>Restart the development server</li>
            </ol>
            <p style={{ fontSize: 'var(--font-sm)', color: 'var(--text-muted)' }}>
              See the README.md file for detailed instructions.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app-container">
        {/* Modern Header with Search */}
        <motion.header 
          className="app-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="app-title">Weather</h1>
          <div className="header-search">
            <SearchComponent onSearch={handleSearch} />
          </div>
        </motion.header>

        {/* Main Dashboard Content */}
        <main className="dashboard-main">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                className="dashboard-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="main-weather-card">
                  <LoadingSpinner />
                </div>
              </motion.div>
            )}

            {error && !loading && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <div className="error-message">
                  <div className="error-icon">⚠️</div>
                  <h2>Something went wrong</h2>
                  <p>{error}</p>
                  <p style={{ fontSize: 'var(--font-sm)', color: 'var(--text-muted)' }}>
                    Please try searching for another city
                  </p>
                </div>
              </motion.div>
            )}

            {weatherData && !loading && !error && (
              <motion.div
                key="content"
                className="dashboard-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Main Weather Card */}
                <motion.div
                  className="main-weather-card"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <CurrentWeather data={weatherData} />
                </motion.div>

                {/* Details Sidebar */}
                <motion.div
                  className="details-sidebar"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <WeatherDetails data={weatherData} />
                </motion.div>

                {/* Forecast Bar */}
                {forecastData && forecastData.length > 0 && (
                  <motion.div
                    className="forecast-bar"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <ForecastComponent data={forecastData} />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <motion.footer 
          className="app-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p>
            Weather data provided by{' '}
            <a 
              href="https://openweathermap.org/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              OpenWeatherMap
            </a>
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
