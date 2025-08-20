# WeatherlyIQ - A Weather App

WeatherlyIQ is a modern, responsive weather application built with React and Tailwind CSS. It provides real-time weather information for any city worldwide, with support for voice input and geolocation detection. The app features machine learning capabilities including next-day temperature prediction using Linear Regression models trained with scikit-learn. It includes a sleek dark mode, smooth animations, gradient colors with moving background effects, and an intuitive user interface inspired by contemporary weather apps.

## Project Screenshots

### Light Mode

![homeLight1](public/homeLight1.png)
![homeLight2](public/homeLight2.png)
![resultLight](public/resultLight.png)
![aboutLight](public/aboutLight.png)

### Dark Mode

![homeDark1](public/homeDark1.png)
![homeDark2](public/homeDark2.png)
![resultDark](public/resultDark.png)
![aboutDark](public/aboutDark.png)

## Features

- **City Weather Search:** Enter any city name to get current weather data.
- **Voice Input:** Use the Web Speech API's SpeechRecognition interface to input city names by voice.
- **Geolocation Detection:** Automatically detect your location and show local weather.
- **Temperature Units:** Toggle between Celsius and Fahrenheit.
- **Wind Speed Units:** Toggle between meters per second (m/s) and kilometers per hour (km/h).
- **Dark Mode:** Switch between light and dark themes for comfortable viewing.
- **Animated UI:** Smooth background gradients, fade-ins, moving gradient animations, and interactive elements.
- **Error Handling:** User-friendly error messages for invalid input or API issues.
- **Next-Day Temperature Prediction:** Machine learning feature that predicts tomorrow's temperature using Linear Regression model trained with scikit-learn. The model analyzes historical weather patterns to provide accurate temperature forecasts for maximum and minimum temperatures.

## Technology Stack

- **React:** Frontend UI library for building interactive user interfaces.
- **Tailwind CSS:** Utility-first CSS framework for styling and responsive design.
- **Axios:** HTTP client for API requests to OpenWeatherMap.
- **OpenWeatherMap API:** Provides real-time weather data.
- **Web Speech API (SpeechRecognition):** Browser API for voice input.
- **Heroicons:** SVG icon set used for UI icons.
- **JavaScript (ES6+):** Modern JavaScript features and React hooks.
- **Python Flask:** Backend API framework for handling machine learning predictions.
- **Scikit-learn:** Machine learning library for Linear Regression model training and predictions.
- **Pandas:** Data manipulation and analysis for weather data processing.
- **Pickle:** Python module for serializing and saving trained machine learning models.

## Project Structure

- `src/` - Main source code directory.
  - `components/` - Reusable React components (SearchBar, WeatherCard, DarkModeToggle, etc.).
  - `styles/` - CSS files including animations and Tailwind configuration.
  - `App.js` - Main application component managing state and API calls.
  - `index.js` - Entry point rendering the app.
- `public/` - Static assets and HTML template.
- `.gitignore` - Specifies files and folders to ignore in Git.
- `tailwind.config.js` - Tailwind CSS configuration with custom themes and animations.
- `package-lock.json` - NPM package lock file.

## Setup and Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd weatherly
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```
5. Start the development server:
   ```
   npm start
   ```
6. Open your browser and visit `http://localhost:3000` to use the app.

## Environment Variables (.env)

This project uses a `.env` file located in the root directory to securely manage environment-specific configuration variables such as API keys. The `.env` file should never be committed to version control to protect sensitive information.

### What is a `.env` file?

A `.env` file is a plain text file containing key-value pairs of environment variables. These variables are loaded into the application at runtime to configure settings like API keys.

### Typical Variables in `.env`

- `REACT_APP_WEATHER_API_KEY` - Your OpenWeatherMap API key used to fetch weather data.

### How to create the `.env` file

1. In the root directory, create a file named `.env`.
2. Add the required variables in the format `KEY=VALUE`, for example:
   ```
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```
3. Save the file.

### Security Best Practices

- Do not commit your `.env` file to any public repository.
- Use `.gitignore` to exclude the `.env` file from version control.
- Keep your API keys secure and rotate them periodically.

## Usage

- Enter a city name in the search bar or use the microphone button to speak the city name.
- Click "Search" to fetch weather data.
- Use the "Detect my location" button to get weather for your current location.
- Toggle temperature and wind speed units using the buttons on the weather card.
- Switch between light and dark mode using the toggle button.
- View next-day temperature predictions powered by machine learning models.
- Click the info icon to learn more about the app.

## Live Project Link

You can view the live project at: [sharmanishant731.github.io/Weatherly](https://sharmanishant731.github.io/Weatherly)

> Note: If you are using your mobile phone to view the project, please change the setting to desktop mode for the best viewing experience.

## Contact

**Credits:** Nishant Sharma  
For any questions or support, please contact at sharmanishant731@gmail.com
