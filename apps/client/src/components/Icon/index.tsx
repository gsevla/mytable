import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface IconProps {
  type?: 'MCI';
  name: string;
  size?: number;
  color?: string;
}

export function Icon({
  type = 'MCI',
  name,
  size = 32,
  color = '#aaa',
}: IconProps) {
  const literals = {
    MCI: (
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={color}
      />
    ),
  };

  return literals[type];
}
