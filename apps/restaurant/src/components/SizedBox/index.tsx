import React from 'react';
import { View } from 'react-native';

export function SizedBox({ w = 16, h = 16 }: { w?: number; h?: number }) {
  return <View style={{ width: w, height: h }} />;
}
