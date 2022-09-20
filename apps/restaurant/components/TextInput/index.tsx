import React, { forwardRef, Ref, ComponentProps } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { TextInput as PaperTextInput, HelperText } from 'react-native-paper';

type Props = {
  label: string;
  placeholder: string;
  touched?: boolean;
  error?: string;
  value: string;
} & ComponentProps<typeof PaperTextInput>;

function TextInputWithoutRef(
  { label, placeholder, touched, error, ...rest }: Props,
  ref?: Ref<RNTextInput>
) {
  return (
    <>
      <PaperTextInput
        ref={ref}
        label={label}
        placeholder={placeholder}
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
