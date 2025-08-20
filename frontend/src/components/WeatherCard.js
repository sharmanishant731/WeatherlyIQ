import React from 'react';
import { FireIcon, ArrowPathIcon, CloudIcon, ChartBarIcon, SunIcon, CloudArrowDownIcon } from '@heroicons/react/24/outline';

/**
 * WeatherCard component displays detailed weather information for a city,
 * including temperature, predicted temperature for tomorrow, wind speed, weather description, humidity, pressure, and cloudiness.
 * It also provides controls to switch temperature and wind speed units.
 * 
 * @param {object} weather - Current weather data object.
 * @param {object} tomorrowWeather - Predicted weather object for tomorrow.
 * @param {string} unit - Current temperature unit ('C' or 'F').
 * @param {function} setUnit - Function to set temperature unit.
 * @param {string} windUnit - Current wind speed unit ('m/s' or 'km/h').
 * @param {function} setWindUnit - Function to set wind speed unit.
 * @param {function} convertTemp - Function to convert temperature to selected unit.
 * @param {function} convertWindSpeed - Function to convert wind speed to selected unit.
 * @returns JSX.Element|null
 */
function WeatherCard({ weather, tomorrowWeather, unit, setUnit, windUnit, setWindUnit, convertTemp, convertWindSpeed }) {
  if (!weather) return null;

  const tempUnitSymbol = unit === 'C' ? '°C' : '°F';
  const windUnitSymbol = windUnit === 'm/s' ? 'm/s' : 'km/h';

  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;
  const iconClass = "h-7 w-7 text-white mr-2 transition-transform duration-300 hover:scale-125 cursor-pointer";

  return (
    <div
      className="bg-gradient-to-r from-primaryGradientStart to-primaryGradientEnd dark:from-backgroundDarkStart dark:to-backgroundDarkEnd backdrop-blur-xl shadow-custom-lg-light dark:shadow-custom-lg-dark rounded-3xl p-8 max-w-5xl w-full text-white z-10 relative transform transition-transform duration-1000 hover:scale-110 hover:shadow-2xl animate-fade-in overflow-auto flex flex-col"
      aria-live="polite"
    >
      <div className="flex flex-row">
        {/* Section for weather icon and city name */}
        <div className="flex flex-col items-center justify-start w-[22rem] min-h-[16rem] flex-shrink-0 pr-8 pt-1">
          <img
            src={weatherIconUrl}
            alt={weather.weather[0].description}
            className="w-44 h-44 drop-shadow-2xl transition-transform duration-700 hover:rotate-6"
          />
          <h2 className="text-5xl font-display font-extrabold mt-0 drop-shadow-2xl text-center max-w-full break-words">{weather.name}</h2>
        </div>

        {/* Section for weather details and controls */}
        <div className="flex flex-col justify-center min-w-[20rem] min-h-[16rem] space-y-6 text-xl flex-grow">
          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
            {/* Temperature display and unit toggle buttons */}
            <div className="flex flex-col space-y-2">
              <p className="drop-shadow-lg text-lg whitespace-nowrap flex items-center">
                <FireIcon className={iconClass} />
                <span className="font-semibold" style={{ marginRight: '0.25rem' }}>Temperature:</span>
                {convertTemp(weather.main.temp).toFixed(1)} {tempUnitSymbol}
              </p>

              <div className="flex space-x-8 flex-shrink-0 w-56 justify-center">
                <button
                  onClick={() => setUnit('C')}
                  className={`px-3 py-1 rounded-full font-semibold transition-all duration-300 text-sm ${
                    unit === 'C'
                      ? 'bg-secondaryGradientStart bg-gradient-to-r to-secondaryGradientEnd text-white shadow-md scale-105'
                      : 'bg-white bg-opacity-20 dark:bg-opacity-20 text-white hover:bg-secondaryGradientStart hover:bg-gradient-to-r hover:to-secondaryGradientEnd hover:scale-105'
                  }`}
                  aria-pressed={unit === 'C'}
                >
                  C
                </button>
                <button
                  onClick={() => setUnit('F')}
                  className={`px-3 py-1 rounded-full font-semibold transition-all duration-300 text-sm ${
                    unit === 'F'
                      ? 'bg-secondaryGradientStart bg-gradient-to-r to-secondaryGradientEnd text-white shadow-md scale-105'
                      : 'bg-white bg-opacity-20 dark:bg-opacity-20 text-white hover:bg-secondaryGradientStart hover:bg-gradient-to-r hover:to-secondaryGradientEnd hover:scale-105'
                  }`}
                  aria-pressed={unit === 'F'}
                >
                  F
                </button>
              </div>
            </div>

            {/* Wind speed display and unit toggle buttons */}
            <div className="flex flex-col space-y-2 mb-2" style={{marginRight: '-0.5rem'}}>
              <p className="drop-shadow-lg text-lg whitespace-nowrap flex items-center">
                <ArrowPathIcon className={iconClass} />
                <span className="font-semibold" style={{ marginRight: '0.25rem' }}>Wind Speed:</span>{convertWindSpeed(weather.wind.speed).toFixed(1)} {windUnitSymbol}
              </p>
              <div className="flex space-x-8 flex-shrink-0 w-44 justify-start pl-12">
                <button
                  onClick={() => setWindUnit('m/s')}
                  className={`px-3 py-1 rounded-full font-semibold transition-all duration-300 text-sm ${
                    windUnit === 'm/s'
                      ? 'bg-secondaryGradientStart bg-gradient-to-r to-secondaryGradientEnd text-white shadow-md scale-105'
                      : 'bg-white bg-opacity-20 dark:bg-opacity-20 text-white hover:bg-secondaryGradientStart hover:bg-gradient-to-r hover:to-secondaryGradientEnd hover:scale-105'
                  }`}
                  aria-pressed={windUnit === 'm/s'}
                >
                  m/s
                </button>
                <button
                  onClick={() => setWindUnit('km/h')}
                  className={`px-3 py-1 rounded-full font-semibold transition-all duration-300 text-sm ${
                    windUnit === 'km/h'
                      ? 'bg-secondaryGradientStart bg-gradient-to-r to-secondaryGradientEnd text-white shadow-md scale-105'
                      : 'bg-white bg-opacity-20 dark:bg-opacity-20 text-white hover:bg-secondaryGradientStart hover:bg-gradient-to-r hover:to-secondaryGradientEnd hover:scale-105'
                  }`}
                  aria-pressed={windUnit === 'km/h'}
                >
                  km/h
                </button>
              </div>
            </div>

            {/* Additional weather details: description, humidity, pressure, cloudiness */}
            <div className="col-span-2 grid grid-cols-2 gap-x-12 gap-y-10">
              <p className="drop-shadow-lg text-lg flex items-center">
                <SunIcon className={iconClass} />
                <span className="font-semibold" style={{ marginRight: '0.25rem' }}>Weather:</span>{weather.weather[0].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </p>
              <p className="drop-shadow-lg text-lg flex items-center">
                <CloudArrowDownIcon className={iconClass} />
                <span className="font-semibold" style={{ marginRight: '0.25rem' }}>Humidity:</span>{weather.main.humidity} %
              </p>
              <p className="drop-shadow-lg text-lg flex items-center">
                <ChartBarIcon className={iconClass} />
                <span className="font-semibold" style={{ marginRight: '0.25rem' }}>Pressure:</span>{weather.main.pressure} hPa
              </p>
              <p className="drop-shadow-lg text-lg flex items-center">
                <CloudIcon className={iconClass} />
                <span className="font-semibold" style={{ marginRight: '0.25rem' }}>Cloudiness:</span>{weather.clouds.all} %
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom center predicted temperature for tomorrow */}
      {tomorrowWeather && (
        <div className="mt-6 pt-4 border-t border-white/20 text-center">
          <p className="text-xl font-semibold text-white drop-shadow-lg">
            Predicted Temperature for Tomorrow
          </p>
          <p className="text-3xl font-bold text-white drop-shadow-xl mt-1">
            {convertTemp((tomorrowWeather.temp_max + tomorrowWeather.temp_min) / 2).toFixed(1)} {tempUnitSymbol}
          </p>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
