import React from 'react';

/**
 * About component displays information about the Weatherly app,
 * including its features and creator details.
 * 
 * @param {function} onClose - Function to close the About modal.
 * @returns JSX.Element
 */
function About({ onClose }) {
  return (
    <>
      {/* Overlay background with blur and opacity */}
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"></div>

      {/* Centered modal container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
        {/* Modal content with gradient background, rounded corners, shadow, and scrollable overflow */}
        <div className="bg-gradient-to-r from-primaryGradientStart to-primaryGradientEnd dark:from-primaryGradientDarkStart dark:to-primaryGradientDarkEnd animate-background-pan bg-[length:200%_200%] rounded-3xl shadow-custom-lg-light dark:shadow-custom-lg-dark p-8 max-w-6xl w-full text-white relative overflow-auto max-h-[80vh]">
          
          {/* Close button positioned at top-right */}
          <button
            onClick={onClose}
            aria-label="Close About page"
            className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded-full"
          >
            {/* SVG icon for close (X) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Title */}
          <h2 className="text-4xl font-bold mb-6 text-center">About WeatherlyIQ</h2>

          {/* Description paragraph */}
          <p className="mb-4 text-lg">
            WeatherlyIQ is a lightweight weather web app designed to give you accurate, real-time weather updates wherever you are. Whether you're planning your day or just want to check if you need an umbrella, Weatherly has you covered — simply, quickly, and beautifully.
          </p>

          {/* Features heading */}
          <h3 className="text-2xl font-bold mb-3">Key Features:</h3>

          {/* Features list */}
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li><strong>Search by City:</strong> Type and search for weather details of any city worldwide.</li>
            <li><strong>Location Detection:</strong> Use the "Detect My Location" button to fetch local weather using your device’s GPS.</li>
            <li><strong>Voice Search:</strong> Tap the mic icon to speak and search for city weather effortlessly.</li>
            <li><strong>Dark Mode:</strong> Switch to a sleek dark mode for a comfortable viewing experience, day or night.</li>
            <li><strong>Unit Conversion:</strong> Toggle between °C and °F for temperature, and between m/s and km/h for wind speed.</li>
            <li><strong>Comprehensive Weather Info:</strong> View temperature, wind speed, humidity, pressure, cloudiness, and current weather conditions.</li>
            <li><strong>Powered by OpenWeatherMap API:</strong> Ensures reliable and updated weather data.</li>
          </ul>

          {/* Motivational tagline */}
          <p className="mt-6 text-lg font-bold text-center">STAY UPDATED. STAY WEATHERLYIQ.</p>

          {/* Creator credit */}
          <p className="mt-6 text-sm italic font-bold text-right">Created with ❤️ by Nishant Sharma using React.</p>
        </div>
      </div>
    </>
  );
}

export default About;
