import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ErrorMessage from './components/ErrorMessage';
import Footer from './components/Footer';
import DarkModeToggle from './components/DarkModeToggle';
import AboutIcon from './components/AboutIcon';
import About from './components/About';

/**
 * Main App component for the Weatherly application.
 * Manages state for city, weather data, units, loading, dark mode, and about page.
 * Handles fetching weather data from OpenWeatherMap API and geolocation.
 * Renders main UI components including search bar, weather card, error messages, footer, and toggles.
 * 
 * @returns JSX.Element
 */
function App() {
  // State for city input
  const [city, setCity] = useState('');
  // State for fetched weather data
  const [weather, setWeather] = useState(null);
  // State for tomorrow's predicted weather
  const [tomorrowWeather, setTomorrowWeather] = useState(null);
  // State for error messages
  const [error, setError] = useState('');
  // Temperature unit state ('C' or 'F')
  const [unit, setUnit] = useState('C');
  // Wind speed unit state ('m/s' or 'km/h')
  const [windUnit, setWindUnit] = useState('m/s');
  // Loading state for API calls
  const [loading, setLoading] = useState(false);
  // Dark mode toggle state
  const [darkMode, setDarkMode] = useState(false);
  // About page modal open state
  const [aboutPageOpen, setAboutPageOpen] = useState(false);

  // Effect to add/remove dark mode classes on document and body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle dark mode state
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Toggle about page modal visibility
  const toggleAboutPage = () => {
    setAboutPageOpen(!aboutPageOpen);
  };

  // API key from environment variables
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;


  /**
   * Fetch weather data for a given city using OpenWeatherMap API.
   * Handles errors and updates state accordingly.
   * 
   * @param {string} searchCity - City name to search for weather.
   */
  const getWeather = async (searchCity) => {
  const queryCity = searchCity || city;
  if (!queryCity) {
    setError('Please enter a city name');
    setWeather(null);
    setTomorrowWeather(null); // clear predicted weather
    return;
  }
  if (!apiKey) {
    setError('API key is missing. Please set REACT_APP_WEATHER_API_KEY in your .env file.');
    setWeather(null);
    setTomorrowWeather(null); // clear predicted weather
    return;
  }

  try {
    setError('');
    setLoading(true);

    // 1️⃣ Fetch current weather
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${apiKey}&units=metric`
    );
    setWeather(response.data);

    // 2️⃣ Fetch tomorrow's predicted weather from your Flask backend
    try {
      const tomorrowRes = await axios.get(`http://127.0.0.1:5000/predict?city=${queryCity}`);
      setTomorrowWeather(tomorrowRes.data);
    } catch (predictionError) {
      console.error("Error fetching tomorrow's weather:", predictionError);
      setTomorrowWeather(null); // fail silently
    }

  } catch (err) {
    if (err.response && err.response.status === 404) {
      setError('City not found. Please check the city name.');
    } else if (err.response && err.response.status === 401) {
      setError('Invalid API key. Please check your API key.');
      console.error('OpenWeatherMap API key error:', err.response.data);
    } else {
      setError('Failed to fetch weather data. Please try again later.');
    }
    setWeather(null);
    setTomorrowWeather(null); // clear predicted weather
  } finally {
    setLoading(false);
  }
};


  // Geolocation detection to fetch weather for current location
  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    setLoading(true);
    setError('');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
          );
          setWeather(response.data);
          setCity(response.data.name);
          
          // Also fetch tomorrow's prediction for the detected location
          try {
            const tomorrowRes = await axios.get(`http://127.0.0.1:5000/predict?city=${response.data.name}`);
            setTomorrowWeather(tomorrowRes.data);
          } catch (predictionError) {
            console.error("Error fetching tomorrow's weather:", predictionError);
            setTomorrowWeather(null);
          }
        } catch (err) {
          setError('Failed to fetch weather data for your location.');
          setWeather(null);
          setTomorrowWeather(null);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError('Unable to retrieve your location.');
        setLoading(false);
      }
    );
  };

  // Convert temperature from Celsius to selected unit
  const convertTemp = (tempC) => {
    return unit === 'C' ? tempC : (tempC * 9) / 5 + 32;
  };

  // Convert wind speed from m/s to selected unit
  const convertWindSpeed = (speedMs) => {
    return windUnit === 'm/s' ? speedMs : speedMs * 3.6;
  };

  // State to control visibility of weather info modal
  const [showModal, setShowModal] = React.useState(false);

  // Show modal when weather data is available
  React.useEffect(() => {
    if (weather) {
      setShowModal(true);
    }
  }, [weather]);

  // Close weather info modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-primary-gradient dark:bg-dark-gradient animate-background-pan bg-[length:200%_200%] flex flex-col items-center justify-center p-6 font-sans relative overflow-auto">
      {/* Dark mode toggle button */}
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {/* About page icon button */}
      <AboutIcon onClick={toggleAboutPage} />
      {/* About page modal */}
      {aboutPageOpen && <About onClose={toggleAboutPage} />}
      {/* Main content area with blur effect when modal is open */}
      <div className={`${showModal ? 'blur-sm pointer-events-none select-none' : ''} mt-32 flex flex-col items-center w-full max-w-md flex-grow`}>
        <h1 className="text-8xl font-display font-extrabold mb-10 text-white dark:text-textDark drop-shadow-xl z-10 relative">WeatherlyIQ</h1>
        {/* Search bar component */}
        <SearchBar city={city} setCity={setCity} getWeather={getWeather} loading={loading} detectLocation={detectLocation} setLoading={setLoading} />
        {/* Error message display */}
        <ErrorMessage error={error} />
      </div>
      {/* Footer component */}
      <Footer />
      {/* Weather info modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="weather-modal-title"
        >
          <div className="bg-primary-gradient dark:bg-dark-gradient animate-background-pan bg-[length:200%_200%] rounded-3xl p-6 max-w-5xl w-full text-white relative shadow-2xl">
            {/* Close button for modal */}
            <button
              onClick={closeModal}
              aria-label="Close weather info"
              className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* WeatherCard component showing detailed weather info */}
            <WeatherCard
              weather={weather}
              tomorrowWeather={tomorrowWeather}
              unit={unit}
              setUnit={setUnit}
              windUnit={windUnit}
              setWindUnit={setWindUnit}
              convertTemp={convertTemp}
              convertWindSpeed={convertWindSpeed}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
