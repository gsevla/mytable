import React from 'react';
import { StyleSheet, StyleProp, Animated, ViewStyle } from 'react-native';
import { Surface } from 'react-native-paper';

interface Props {
  children: React.ReactNode;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    elevation: 4,
    borderRadius: 4,
  },
});

export function Paper({ children, style = {} }: Props) {
  return <Surface style={[styles.container, style]}>{children}</Surface>;
}
