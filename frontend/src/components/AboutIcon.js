import React from 'react';

/**
 * AboutIcon component renders a button with an "About" icon.
 * When clicked, it triggers the onClick handler passed as a prop.
 * 
 * @param {function} onClick - Function to handle click events on the button.
 * @returns JSX.Element
 */
function AboutIcon({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open About page"
      title="About"
      className="fixed top-4 right-20 bg-gradient-to-r from-primaryGradientStart to-primaryGradientEnd dark:from-primaryGradientDarkStart dark:to-primaryGradientDarkEnd animate-background-pan bg-[length:200%_200%] text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-6 focus:ring-primary transition transform hover:scale-110 active:scale-95"
    >
      {/* SVG icon representing an information symbol */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="16" x2="12" y2="12" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="8" r="1" fill="currentColor" />
      </svg>
    </button>
  );
}

export default AboutIcon;
