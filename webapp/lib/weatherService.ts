import axios from 'axios';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  pressure: number;
  description: string;
  icon: string;
  windSpeed: number;
  windDeg: number;
  clouds: number;
  visibility: number;
  sunrise: number;
  sunset: number;
  cityName: string;
  country: string;
}

export interface ForecastData {
  date: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pop: number; // Probability of precipitation
}

export async function getCurrentWeather(city: string): Promise<WeatherData> {
  try {
    const url = `${BASE_URL}/weather?q=${encodeURIComponent(
      city + ',PK'
    )}&units=metric&appid=${OPENWEATHER_API_KEY}`;

    const response = await axios.get(url);
    const data = response.data;

    return {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      tempMin: Math.round(data.main.temp_min),
      tempMax: Math.round(data.main.temp_max),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      windSpeed: data.wind.speed,
      windDeg: data.wind.deg,
      clouds: data.clouds.all,
      visibility: data.visibility,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      cityName: data.name,
      country: data.sys.country,
    };
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw new Error('Failed to fetch weather data');
  }
}

export async function getWeatherForecast(
  city: string
): Promise<ForecastData[]> {
  try {
    const url = `${BASE_URL}/forecast?q=${encodeURIComponent(
      city + ',PK'
    )}&units=metric&appid=${OPENWEATHER_API_KEY}`;

    const response = await axios.get(url);
    const data = response.data;

    // Group forecasts by day and get one forecast per day
    const dailyForecasts: ForecastData[] = [];
    const processedDates = new Set<string>();

    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();

      if (!processedDates.has(date) && dailyForecasts.length < 5) {
        processedDates.add(date);
        dailyForecasts.push({
          date: date,
          temp: Math.round(item.main.temp),
          tempMin: Math.round(item.main.temp_min),
          tempMax: Math.round(item.main.temp_max),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
          pop: Math.round((item.pop || 0) * 100),
        });
      }
    });

    return dailyForecasts;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw new Error('Failed to fetch weather forecast');
  }
}

export async function getWeatherByCoordinates(
  lat: number,
  lon: number
): Promise<WeatherData> {
  try {
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`;

    const response = await axios.get(url);
    const data = response.data;

    return {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      tempMin: Math.round(data.main.temp_min),
      tempMax: Math.round(data.main.temp_max),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      windSpeed: data.wind.speed,
      windDeg: data.wind.deg,
      clouds: data.clouds.all,
      visibility: data.visibility,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      cityName: data.name,
      country: data.sys.country,
    };
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    throw new Error('Failed to fetch weather data');
  }
}

export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

