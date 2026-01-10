import axios from 'axios';

const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || process.env.OPENWEATHER_API_KEY;
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

export interface WeatherAlert {
  event: string;
  start: number;
  end: number;
  description: string;
  severity: 'extreme' | 'severe' | 'moderate' | 'minor';
  tags: string[];
}

// Fallback weather data for Pakistan cities
const fallbackWeatherData: { [key: string]: WeatherData } = {
  'islamabad': {
    temp: 18,
    feelsLike: 16,
    tempMin: 15,
    tempMax: 22,
    humidity: 45,
    pressure: 1013,
    description: 'Clear sky',
    icon: '01d',
    windSpeed: 3.5,
    windDeg: 180,
    clouds: 10,
    visibility: 10000,
    sunrise: 1704776400,
    sunset: 1704812400,
    cityName: 'Islamabad',
    country: 'PK',
  },
  'lahore': {
    temp: 22,
    feelsLike: 20,
    tempMin: 18,
    tempMax: 25,
    humidity: 60,
    pressure: 1012,
    description: 'Hazy conditions',
    icon: '50d',
    windSpeed: 2.5,
    windDeg: 90,
    clouds: 40,
    visibility: 5000,
    sunrise: 1704776400,
    sunset: 1704812400,
    cityName: 'Lahore',
    country: 'PK',
  },
  'karachi': {
    temp: 25,
    feelsLike: 24,
    tempMin: 22,
    tempMax: 28,
    humidity: 70,
    pressure: 1011,
    description: 'Partly cloudy',
    icon: '02d',
    windSpeed: 5.0,
    windDeg: 270,
    clouds: 30,
    visibility: 8000,
    sunrise: 1704776400,
    sunset: 1704812400,
    cityName: 'Karachi',
    country: 'PK',
  },
};

function getFallbackWeather(city: string): WeatherData {
  const cityLower = city.toLowerCase();
  return fallbackWeatherData[cityLower] || fallbackWeatherData['islamabad'];
}

function generateFallbackForecast(city: string, days: number = 5): ForecastData[] {
  const forecasts: ForecastData[] = [];
  const baseTemp = fallbackWeatherData[city.toLowerCase()]?.temp || 20;

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    forecasts.push({
      date: date.toLocaleDateString(),
      temp: baseTemp + Math.floor(Math.random() * 5) - 2,
      tempMin: baseTemp - 3,
      tempMax: baseTemp + 4,
      description: i % 2 === 0 ? 'Clear sky' : 'Partly cloudy',
      icon: i % 2 === 0 ? '01d' : '02d',
      humidity: 50 + Math.floor(Math.random() * 20),
      windSpeed: 2 + Math.random() * 3,
      pop: Math.floor(Math.random() * 30),
    });
  }

  return forecasts;
}

export async function getCurrentWeather(city: string): Promise<WeatherData> {
  try {
    if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY.includes('your_')) {
      console.log('OpenWeather API key not configured, using fallback data');
      return getFallbackWeather(city);
    }

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
    return getFallbackWeather(city);
  }
}

export async function getWeatherForecast(
  city: string,
  days: number = 5
): Promise<ForecastData[]> {
  try {
    if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY.includes('your_')) {
      console.log('OpenWeather API key not configured, using fallback forecast');
      return generateFallbackForecast(city, days);
    }

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

      if (!processedDates.has(date) && dailyForecasts.length < days) {
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
    return generateFallbackForecast(city, days);
  }
}

export async function getWeatherByCoordinates(
  lat: number,
  lon: number
): Promise<WeatherData> {
  try {
    if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY.includes('your_')) {
      console.log('OpenWeather API key not configured, using fallback data');
      return getFallbackWeather('islamabad');
    }

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
    return getFallbackWeather('islamabad');
  }
}

export async function getWeatherAlerts(lat: number, lon: number): Promise<WeatherAlert[]> {
  try {
    if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY.includes('your_')) {
      console.log('OpenWeather API key not configured, no alerts available');
      return [];
    }

    // Using One Call API 3.0 for alerts
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${OPENWEATHER_API_KEY}`;

    const response = await axios.get(url);
    const data = response.data;

    if (!data.alerts || data.alerts.length === 0) {
      return [];
    }

    return data.alerts.map((alert: any) => ({
      event: alert.event,
      start: alert.start,
      end: alert.end,
      description: alert.description,
      severity: determineSeverity(alert.event),
      tags: alert.tags || [],
    }));
  } catch (error) {
    console.error('Error fetching weather alerts:', error);
    return [];
  }
}

function determineSeverity(event: string): 'extreme' | 'severe' | 'moderate' | 'minor' {
  const eventLower = event.toLowerCase();
  if (eventLower.includes('extreme') || eventLower.includes('hurricane') || eventLower.includes('tornado')) {
    return 'extreme';
  } else if (eventLower.includes('severe') || eventLower.includes('flood') || eventLower.includes('storm')) {
    return 'severe';
  } else if (eventLower.includes('warning') || eventLower.includes('advisory')) {
    return 'moderate';
  }
  return 'minor';
}

export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

