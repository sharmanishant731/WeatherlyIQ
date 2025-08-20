import React from 'react';

/**
 * Footer component displays the footer section of the app,
 * including attribution to the weather data provider and copyright.
 * 
 * @returns JSX.Element
 */
function Footer() {
  return (
    <footer className="mt-auto text-white mt-20 mb-8 z-10 relative text-center text-sm opacity-75 drop-shadow-lg font-semibold tracking-wide">
      {/* Attribution to OpenWeatherMap with link */}
      Weather data provided by{' '}
      <a
        href="https://openweathermap.org"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-primary-light transition-colors duration-300"
      >
        OpenWeatherMap
      </a>{' '}
      | &copy; 2025 WeatherlyIQ
    </footer>
  );
}

export default Footer;
