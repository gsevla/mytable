import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface IconProps {
  type?: 'MCI';
  name: string;
  size?: number;
  color?: string;
}

export function Icon({ type = 'MCI', name, size = 32 }: IconProps) {
  const literals = {
    MCI: (
      <MaterialCommunityIcons
        name={name}
        size={size}
      />
    ),
  };

  return literals[type];
}
