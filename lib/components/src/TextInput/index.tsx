import React, { forwardRef, Ref } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { TextInput as PaperTextInput, HelperText } from 'react-native-paper';

export type TextInputProps = {
  label: string;
  placeholder: string;
  touched?: boolean;
  error?: string;
  value: string;
  disabled?: boolean;
  multiline?: boolean;
  secureTextEntry?: boolean;
};

function TextInputWithoutRef(
  { label, placeholder, touched, error, ...rest }: TextInputProps,
  ref?: Ref<RNTextInput>
) {
  return (
    <>
      <PaperTextInput
        ref={ref}
        label={label}
        placeholder={placeholder}
        style={{
          height: rest?.multiline ? 128 : 76,
        }}
        numberOfLines={rest?.multiline ? 4 : 1}
        {...rest}
      />
      <HelperText
        type='error'
        visible={!!touched && !!error}
      >
        {error}
      </HelperText>
    </>
  );
}

export const TextInput = forwardRef(TextInputWithoutRef);
