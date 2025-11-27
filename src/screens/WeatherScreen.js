import React, { useMemo } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Dimensions, 
  StatusBar,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import useWeatherController from '../hooks/useWeatherController';
import WeatherIcon3D from '../components/WeatherIcon3D';
import DetailCard from '../components/DetailCard';

const { width } = Dimensions.get('window');

const getBackgroundGradient = (weatherMain) => {
  switch (weatherMain?.toLowerCase()) {
    case 'clear': return ['#fb923c', '#f43f5e', '#9333ea'];
    case 'clouds': return ['#93c5fd', '#94a3b8', '#475569'];
    case 'rain': return ['#334155', '#1e40af', '#0f172a'];
    case 'thunderstorm': return ['#312e81', '#581c87', '#000000'];
    case 'drizzle': return ['#60a5fa', '#3b82f6', '#1e3a8a'];
    case 'snow': return ['#e0f2fe', '#bae6fd', '#7dd3fc'];
    case 'mist': 
    case 'fog': return ['#d1d5db', '#9ca3af', '#4b5563'];
    default: return ['#3b82f6', '#6366f1', '#9333ea'];
  }
};

const WeatherScreen = () => {
  const { models, actions } = useWeatherController();
  
  const gradientColors = useMemo(() => 
    getBackgroundGradient(models.weatherData?.weather[0].main), 
  [models.weatherData]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={gradientColors}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={[styles.orb, styles.orb1]} />
      <View style={[styles.orb, styles.orb2]} />

      <BlurView intensity={50} tint="dark" style={styles.glassCard}>
        
        <View style={styles.header}>
          <Ionicons name="menu" color="rgba(255,255,255,0.8)" size={24} />
          <Text style={styles.appTitle}>VISÃO DO FUTURO</Text>
          <View style={styles.countryBadge}>
            <Text style={styles.countryText}>
              {models.weatherData ? models.weatherData.sys.country : 'BR'}
            </Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Digite uma cidade..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={models.city}
            onChangeText={actions.setCity}
            onSubmitEditing={actions.handleSearch}
          />
          <Ionicons name="search" size={18} color="rgba(255,255,255,0.6)" style={styles.searchIcon} />
          
          <TouchableOpacity 
            style={styles.searchButton} 
            onPress={actions.handleSearch}
            activeOpacity={0.7}
          >
            {models.loading ? (
              <ActivityIndicator color="#4f46e5" size="small" />
            ) : (
              <Ionicons name="search" size={18} color="#4f46e5" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {models.error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{models.error}</Text>
              {models.error.includes('inválida') && (
                 <Text style={[styles.errorText, {fontSize: 10, marginTop: 4, fontWeight: 'normal'}]}>
                   Aguarde a ativação da chave.
                 </Text>
              )}
            </View>
          ) : null}

          {!models.weatherData && !models.loading ? (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="map-marker-radius" size={48} color="rgba(255,255,255,0.2)" />
              <Text style={styles.emptyText}>Antes da RAID veja o clima</Text>
            </View>
          ) : models.loading && !models.weatherData ? (
             <View style={styles.emptyState}>
               <Text style={styles.loadingText}>CARREGANDO...</Text>
             </View>
          ) : models.weatherData ? (
            <View style={styles.weatherInfo}>
              
              <WeatherIcon3D main={models.weatherData.weather[0].main} />
              
              <Text style={styles.cityName}>{models.weatherData.name}</Text>
              <Text style={styles.weatherDesc}>
                {models.weatherData.weather[0].description}
              </Text>

              <View style={styles.tempContainer}>
                <Text style={styles.tempValue}>
                  {Math.round(models.weatherData.main.temp)}
                </Text>
                <Text style={styles.tempUnit}>°</Text>
              </View>

              <View style={styles.detailsGrid}>
                <DetailCard 
                  iconName="weather-windy" 
                  label="Vento" 
                  value={`${models.weatherData.wind.speed} km/h`} 
                />
                <DetailCard 
                  iconName="water-percent" 
                  label="Umidade" 
                  value={`${models.weatherData.main.humidity}%`} 
                />
                <DetailCard 
                  iconName="flash" 
                  label="Sensação" 
                  value={`${Math.round(models.weatherData.main.feels_like || models.weatherData.main.temp)}°`} 
                />
              </View>

            </View>
          ) : null}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            onPress={() => actions.updateConfig('useMock', !models.config.useMock)}
            style={[
              styles.configButton,
              models.config.useMock ? { backgroundColor: 'rgba(255,255,0,0.2)' } : { backgroundColor: 'rgba(0,255,0,0.1)' }
            ]}
          >
            <Text style={styles.configText}>
              {models.config.useMock ? 'DEMO MODE' : '🟢 LIVE API'}
            </Text>
          </TouchableOpacity>
        </View>

      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
  },
  orb1: {
    top: 40,
    left: 40,
    width: 200,
    height: 200,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  orb2: {
    bottom: 80,
    right: 40,
    width: 250,
    height: 250,
    backgroundColor: 'rgba(147, 51, 234, 0.2)', 
  },
  glassCard: {
    width: width * 0.9,
    height: '85%',
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
    marginTop: Platform.OS === 'android' ? 20 : 0,
  },
  appTitle: {
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 2,
  },
  countryBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchContainer: {
    marginHorizontal: 24,
    position: 'relative',
    height: 50,
    justifyContent: 'center',
    zIndex: 100,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 25,
    paddingLeft: 45,
    paddingRight: 50,
    color: 'white',
    height: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
  },
  searchButton: {
    position: 'absolute',
    right: 5,
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingHorizontal: 24,
  },
  errorContainer: {
    position: 'absolute',
    top: 10,
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    zIndex: 10,
    maxWidth: '90%',
  },
  errorText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    gap: 10,
    marginTop: 50,
  },
  emptyText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
  },
  loadingText: {
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 3,
    marginTop: 50,
  },
  weatherInfo: {
    alignItems: 'center',
    width: '100%',
  },
  cityName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  weatherDesc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
    marginTop: 4,
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tempValue: {
    fontSize: 100,
    fontWeight: '200',
    color: 'white',
    lineHeight: 110,
  },
  tempUnit: {
    fontSize: 40,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 15,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 40,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  configButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  configText: {
    color: 'white',
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: '600',
  }
});

export default WeatherScreen;