import React, { useState, useEffect, useRef } from 'react';
import '../styles/animations.css';

/**
 * SearchBar component provides an input field for city name search,
 * supports voice input using SpeechRecognition API, and buttons to
 * trigger search and detect location.
 * 
 * @param {string} city - Current city input value.
 * @param {function} setCity - Function to update city input value.
 * @param {function} getWeather - Function to fetch weather data for the city.
 * @param {boolean} loading - Indicates if weather data is being loaded.
 * @param {function} detectLocation - Function to detect user's location.
 * @param {function} setLoading - Function to set loading state.
 * @returns JSX.Element
 */
function SearchBar({ city, setCity, getWeather, loading, detectLocation, setLoading }) {
  // State to track if voice recognition is active
  const [listening, setListening] = useState(false);
  // Ref to store SpeechRecognition instance
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if SpeechRecognition API is supported
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      recognitionRef.current = null;
      return;
    }
    // Initialize SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // Handle speech recognition result
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setCity(speechResult);
      setLoading(true);
      getWeather(speechResult);
      setListening(false);
    };

    // Handle speech recognition error
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setListening(false);
    };

    // Handle speech recognition end
    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, [getWeather, setCity]);

  // Toggle voice recognition on/off
  const toggleListening = () => {
    if (listening) {
      recognitionRef.current && recognitionRef.current.stop();
      setListening(false);
    } else {
      setListening(true);
      recognitionRef.current && recognitionRef.current.start();
    }
  };

  return (
    <div className="mb-8 w-full max-w-md z-10 relative">
      <div className="relative flex items-center">
        {/* Text input for city name */}
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="City name"
          className="w-full p-5 pr-16 rounded-3xl focus:outline-none focus:ring-6 focus:ring-primaryGradientStart dark:focus:ring-primaryGradientEnd transition-shadow shadow-custom-lg-light dark:shadow-custom-lg-dark bg-white bg-opacity-95 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-300 text-gray-900 dark:text-gray-100 text-lg font-semibold"
        />
        {/* Button to toggle voice input */}
        <button
          onClick={toggleListening}
          disabled={loading}
          aria-pressed={listening}
          aria-label="tap to speak"
          title="tap to speak"
          className={`absolute right-10 top-1/2 transform -translate-y-1/2 text-primaryGradientStart dark:text-white hover:text-primaryGradientEnd dark:hover:text-white focus:outline-none`}
        >
          {/* Microphone icon, animates when listening */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-7 w-7 ${listening ? 'animate-pulse' : ''}`}
            fill="none"
            viewBox="0 0 16 24"
            stroke="currentColor"
            strokeWidth={1.92}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3zM19 10a7 7 0 01-14 0"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 17v4m-4-4h8"
            />
          </svg>
        </button>
        {/* Visual indicator when listening */}
        {listening && (
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2 flex space-x-1 items-end">
            <span className="w-1 h-4 bg-primaryGradientStart dark:bg-white rounded animate-wave delay-0"></span>
            <span className="w-1 h-4 bg-primaryGradientStart dark:bg-white rounded animate-wave delay-200"></span>
            <span className="w-1 h-4 bg-primaryGradientStart dark:bg-white rounded animate-wave delay-400"></span>
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-center space-x-4">
        {/* Button to trigger weather search */}
        <button
          onClick={() => getWeather(city)}
          disabled={loading}
          aria-busy={loading}
          className={`bg-gradient-to-r from-primaryGradientStart to-primaryGradientEnd dark:from-primaryGradientDarkStart dark:to-primaryGradientDarkEnd animate-background-pan bg-[length:200%_200%] text-white px-8 py-5 rounded-3xl hover:from-primaryGradientEnd hover:to-primaryGradientStart dark:hover:from-primaryGradientDarkEnd dark:hover:to-primaryGradientDarkStart transition-shadow shadow-[0_8px_15px_rgba(74,144,226,0.6),0_4px_6px_rgba(74,144,226,0.4),inset_0_-3px_5px_rgba(255,255,255,0.3)] dark:shadow-[0_8px_15px_rgba(44,62,80,0.8),0_4px_6px_rgba(44,62,80,0.6),inset_0_-3px_5px_rgba(255,255,255,0.1)] font-semibold text-lg transform transition-transform duration-300 hover:scale-105 active:scale-95 min-w-[140px]`}
        >
          {loading ? (
            <div className="flex items-center justify-center w-[150px] space-x-2">
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span>Loading...</span>
            </div>
          ) : (
            <div className="w-[150px] text-center">Search</div>
          )}
        </button>
        {/* Button to detect user's location */}
        <button
          onClick={detectLocation}
          disabled={loading}
          className="bg-gradient-to-r from-primaryGradientStart to-primaryGradientEnd dark:from-primaryGradientDarkStart dark:to-primaryGradientDarkEnd animate-background-pan bg-[length:200%_200%] text-white px-6 py-5 rounded-3xl hover:from-primaryGradientEnd hover:to-primaryGradientStart dark:hover:from-primaryGradientDarkEnd dark:hover:to-primaryGradientDarkStart transition-shadow shadow-[0_8px_15px_rgba(74,144,226,0.6),0_4px_6px_rgba(74,144,226,0.4),inset_0_-3px_5px_rgba(255,255,255,0.3)] dark:shadow-[0_8px_15px_rgba(44,62,80,0.8),0_4px_6px_rgba(44,62,80,0.6),inset_0_-3px_5px_rgba(255,255,255,0.1)] font-semibold text-lg transform transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          Detect my location
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
