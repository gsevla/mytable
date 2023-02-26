import React from 'react';
import { View } from 'react-native';

export type SizedBoxProps = {
  w?: number;
  h?: number;
};

export function SizedBox({ w = 16, h = 16 }: SizedBoxProps) {
  return (
    <View
      accessible={false}
      style={{ width: w, height: h }}
    />
  );
}
