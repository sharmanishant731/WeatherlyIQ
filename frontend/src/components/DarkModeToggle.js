import React from 'react';

/**
 * DarkModeToggle component renders a button to toggle dark mode on and off.
 * It displays different SVG icons based on the current dark mode state.
 * 
 * @param {boolean} darkMode - Current state of dark mode (true if enabled).
 * @param {function} toggleDarkMode - Function to toggle the dark mode state.
 * @returns JSX.Element
 */
function DarkModeToggle({ darkMode, toggleDarkMode }) {
  return (
    <button
      onClick={toggleDarkMode}
      aria-pressed={darkMode}
      title="Toggle dark mode"
      className="fixed top-4 right-4 bg-gradient-to-r from-primaryGradientStart to-primaryGradientEnd dark:from-primaryGradientDarkStart dark:to-primaryGradientDarkEnd animate-background-pan bg-[length:200%_200%] text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-6 focus:ring-primary transition transform hover:scale-110 active:scale-95"
    >
      {/* Icon for dark mode enabled (moon icon) */}
      {darkMode ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
        </svg>
      ) : (
        /* Icon for dark mode disabled (sun icon) */
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="6" strokeLinecap="round" strokeLinejoin="round" />
          <g strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
            <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
            <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
          </g>
        </svg>
      )}
    </button>
  );
}

export default DarkModeToggle;
