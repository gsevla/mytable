import React from 'react';
import { Text as PaperText } from 'react-native-paper';

export type TextProps = {
  children: React.ReactChild;
};

export function Text({ children }: TextProps) {
  return <PaperText>{children}</PaperText>;
}
