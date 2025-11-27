import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const WeatherIcon3D = ({ main }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -15, duration: 2000, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 2000, useNativeDriver: true })
      ])
    ).start();

    Animated.loop(
      Animated.timing(spinAnim, { toValue: 1, duration: 10000, useNativeDriver: true })
    ).start();
  }, [main]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const iconSize = 100;
  let IconComp;
  let animStyle = { transform: [{ translateY: floatAnim }] };
  const condition = main?.toLowerCase();

  if (condition === 'clear') {
    IconComp = <MaterialCommunityIcons name="weather-sunny" size={iconSize} color="#fde047" />;
    animStyle = { transform: [{ rotate: spin }] }; 
  } else if (condition === 'clouds') {
    IconComp = <MaterialCommunityIcons name="weather-cloudy" size={iconSize} color="white" />;
  } else if (condition === 'rain' || condition === 'drizzle') {
    IconComp = <MaterialCommunityIcons name="weather-pouring" size={iconSize} color="#bfdbfe" />;
  } else if (condition === 'thunderstorm') {
    IconComp = <MaterialCommunityIcons name="weather-lightning" size={iconSize} color="#d8b4fe" />;
  } else if (condition === 'snow') {
    IconComp = <MaterialCommunityIcons name="weather-snowy" size={iconSize} color="#e0f2fe" />;
  } else {
    IconComp = <MaterialCommunityIcons name="weather-windy" size={iconSize} color="white" />;
  }

  return (
    <Animated.View style={[styles.iconContainer, animStyle]}>
      {IconComp}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
});

export default WeatherIcon3D;