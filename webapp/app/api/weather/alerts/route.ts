import { NextRequest, NextResponse } from 'next/server';
import { getWeatherAlerts, getCurrentWeather } from '@/lib/weatherService';

// Major Pakistan cities coordinates
const pakistanCities = [
  { name: 'Islamabad', lat: 33.6844, lng: 73.0479 },
  { name: 'Lahore', lat: 31.5497, lng: 74.3436 },
  { name: 'Karachi', lat: 24.8607, lng: 67.0011 },
  { name: 'Peshawar', lat: 34.0151, lng: 71.5249 },
  { name: 'Quetta', lat: 30.1798, lng: 66.9750 },
  { name: 'Multan', lat: 30.1575, lng: 71.5249 },
  { name: 'Faisalabad', lat: 31.4504, lng: 73.1350 },
  { name: 'Rawalpindi', lat: 33.5651, lng: 73.0169 },
  { name: 'Gujranwala', lat: 32.1617, lng: 74.1883 },
  { name: 'Sialkot', lat: 32.4945, lng: 74.5229 },
  { name: 'Gilgit', lat: 35.9208, lng: 74.3144 },
  { name: 'Skardu', lat: 35.2978, lng: 75.6333 },
  { name: 'Murree', lat: 33.9070, lng: 73.3903 },
  { name: 'Swat', lat: 35.2227, lng: 72.4258 },
  { name: 'Hunza', lat: 36.3167, lng: 74.6500 },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get('city');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    let alerts: any[] = [];
    let weatherData: any[] = [];

    if (lat && lng) {
      // Get alerts for specific coordinates
      const cityAlerts = await getWeatherAlerts(parseFloat(lat), parseFloat(lng));
      alerts = cityAlerts;
      
      const weather = await getCurrentWeather(city || 'Location');
      weatherData = [{ city: city || 'Location', weather, alerts: cityAlerts }];
    } else if (city) {
      // Get alerts for specific city
      const cityData = pakistanCities.find(c => c.name.toLowerCase() === city.toLowerCase());
      if (cityData) {
        const cityAlerts = await getWeatherAlerts(cityData.lat, cityData.lng);
        const weather = await getCurrentWeather(cityData.name);
        alerts = cityAlerts;
        weatherData = [{ city: cityData.name, weather, alerts: cityAlerts }];
      }
    } else {
      // Get alerts for all major cities
      const allCitiesData = await Promise.all(
        pakistanCities.map(async (cityData) => {
          try {
            const cityAlerts = await getWeatherAlerts(cityData.lat, cityData.lng);
            const weather = await getCurrentWeather(cityData.name);
            
            return {
              city: cityData.name,
              lat: cityData.lat,
              lng: cityData.lng,
              weather,
              alerts: cityAlerts,
              hasAlerts: cityAlerts.length > 0,
            };
          } catch (error) {
            console.error(`Error fetching data for ${cityData.name}:`, error);
            return null;
          }
        })
      );

      weatherData = allCitiesData.filter(data => data !== null);
      alerts = weatherData.flatMap(data => data.alerts);
    }

    // Generate mock alerts if no real alerts (for demonstration)
    if (alerts.length === 0 && weatherData.length > 0) {
      const mockAlerts = generateMockAlerts(weatherData);
      alerts = mockAlerts;
      
      // Add mock alerts to weather data
      weatherData = weatherData.map(data => ({
        ...data,
        alerts: mockAlerts.filter(alert => alert.city === data.city),
      }));
    }

    return NextResponse.json({
      success: true,
      alerts,
      weatherData,
      totalAlerts: alerts.length,
      citiesWithAlerts: weatherData.filter(d => d.alerts && d.alerts.length > 0).length,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in weather alerts API:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      alerts: [],
    }, { status: 500 });
  }
}

function generateMockAlerts(weatherData: any[]): any[] {
  const mockAlerts: any[] = [];
  const now = Date.now() / 1000;

  weatherData.forEach(data => {
    const { city, weather } = data;
    
    // Generate alerts based on weather conditions
    if (weather.temp > 35) {
      mockAlerts.push({
        city,
        event: 'Heat Wave Warning',
        start: now,
        end: now + 86400, // 24 hours
        description: `Extreme heat expected in ${city}. Temperature may reach ${weather.temp}°C. Stay hydrated and avoid outdoor activities during peak hours.`,
        severity: 'severe',
        tags: ['heat', 'health'],
      });
    }

    if (weather.temp < 5) {
      mockAlerts.push({
        city,
        event: 'Cold Wave Advisory',
        start: now,
        end: now + 86400,
        description: `Cold weather alert for ${city}. Temperature may drop to ${weather.temp}°C. Dress warmly and protect vulnerable individuals.`,
        severity: 'moderate',
        tags: ['cold', 'health'],
      });
    }

    if (weather.humidity > 80) {
      mockAlerts.push({
        city,
        event: 'High Humidity Alert',
        start: now,
        end: now + 43200, // 12 hours
        description: `High humidity levels (${weather.humidity}%) in ${city}. May cause discomfort and health issues.`,
        severity: 'minor',
        tags: ['humidity'],
      });
    }

    if (weather.windSpeed > 40) {
      mockAlerts.push({
        city,
        event: 'Strong Wind Warning',
        start: now,
        end: now + 21600, // 6 hours
        description: `Strong winds expected in ${city} with speeds up to ${weather.windSpeed} km/h. Secure loose objects.`,
        severity: 'moderate',
        tags: ['wind'],
      });
    }
  });

  return mockAlerts;
}

