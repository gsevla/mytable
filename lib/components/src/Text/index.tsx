import React from 'react';
import { Text as PaperText } from 'react-native-paper';

type Size =
  | 'xxxsm'
  | 'xxsm'
  | 'xsm'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xlg'
  | 'xxlg'
  | 'xxxlg';

type Weight = 'normal' | 'bold';

export type TextProps = {
  children: React.ReactChild | string[];
  size?: Size;
  weight?: Weight;
  alignment?: 'left' | 'center' | 'right';
};

export function Text({
  children,
  size = 'md',
  weight = 'normal',
  alignment = 'left',
}: TextProps) {
  const innerSize = {
    xxxsm: 8,
    xxsm: 10,
    xsm: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xlg: 20,
    xxlg: 22,
    xxxlg: 24,
  }[size];

  const innerWeight = {
    normal: 'normal',
    bold: 'bold,',
  }[weight];

  return (
    <PaperText
      style={{
        fontSize: innerSize,
        fontWeight: innerWeight,
        textAlign: alignment,
      }}
    >
      {children}
    </PaperText>
  );
}
