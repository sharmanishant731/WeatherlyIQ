import React from 'react';

/**
 * ErrorMessage component displays an error message with an alert role.
 * It shows an error icon and the error text if an error is present.
 * 
 * @param /*{string} error - The error message to display.
 * @returns JSX.Element|null
 */
function ErrorMessage({ error }) {
  // If no error, render nothing
  if (!error) return null;

  return (
    <p
      role="alert"
      className="text-secondary-dark dark:text-white mb-6 z-10 relative text-center font-semibold text-base drop-shadow-lg flex items-center justify-center space-x-3 animate-pulse"
    >
      {/* Error icon */}
      <svg
        className="w-6 h-6 text-red-600 dark:text-white drop-shadow-md"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {/* Error message text */}
      <span>{error}</span>
    </p>
  );
}

export default ErrorMessage;
