const WeatherService = {
  apiKey: '10e6d0f2fd7cff2cd74aeae4f1309a4b', 
  
  async getWeather(city, externalKey, isMock) {
    if (isMock) {
      return new Promise((resolve) => {
        const mockTypes = ['Clear', 'Clouds', 'Rain', 'Thunderstorm'];
        const randomType = mockTypes[Math.floor(Math.random() * mockTypes.length)];
        
        setTimeout(() => {
          resolve({
            name: city.charAt(0).toUpperCase() + city.slice(1),
            sys: { country: 'BR' },
            main: { 
              temp: Math.floor(Math.random() * 15) + 20, 
              humidity: 65, 
              feels_like: 32 
            },
            weather: [{ main: randomType, description: 'clima simulado', icon: '04d' }],
            wind: { speed: (Math.random() * 10).toFixed(1) }
          });
        }, 1500);
      });
    }

    const keyToUse = externalKey || this.apiKey;

    if (!keyToUse) throw new Error("API Key necessária.");
    
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${keyToUse}`);
      const data = await response.json();
      
      if (!response.ok) {
         if (data.cod === 401) throw new Error('Chave inválida ou pendente de ativação.');
         if (data.cod === 404) throw new Error('Cidade não encontrada.');
         throw new Error(data.message || 'Erro ao buscar dados.');
      }
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

export default WeatherService;