// components/GradientBackground.js
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

// Set your default gradient colors here
const DEFAULT_GRADIENT_COLORS = ['#3fb59e', '#8bdccd'];

const GradientBackground = ({ children, colors = DEFAULT_GRADIENT_COLORS }) => (
  <LinearGradient colors={colors} style={styles.gradient}>
    <View style={styles.overlay}>
      {children}
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
});

export default GradientBackground;
