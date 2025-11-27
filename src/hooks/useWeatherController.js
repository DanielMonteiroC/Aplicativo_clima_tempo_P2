import { useState, useCallback } from 'react';
import { Keyboard } from 'react-native';
import WeatherService from '../services/WeatherService';

const useWeatherController = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [config, setConfig] = useState({ 
    apiKey: WeatherService.apiKey, 
    useMock: false 
  });

  const handleSearch = useCallback(async () => {
    if (!city.trim()) return;
    Keyboard.dismiss();
    setLoading(true);
    setError('');
    
    try {
      const data = await WeatherService.getWeather(city, config.apiKey, config.useMock);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, [city, config]);

  const updateConfig = (key, value) => setConfig(prev => ({ ...prev, [key]: value }));

  return { 
    models: { city, weatherData, loading, error, config }, 
    actions: { setCity, handleSearch, updateConfig } 
  };
};

export default useWeatherController;