import { SizedBox } from 'components/SizedBox';
import React from 'react';
import { View } from 'react-native';
import { Headline, IconButton } from 'react-native-paper';

type Props = {
  title: string;
  showCloseButton: boolean;
  showPlusButton: boolean;
  onPressCloseButton(): void;
  onPressPlusButton(): void;
};

export default function AppPageContentHeaderComponent({
  title,
  showCloseButton = false,
  showPlusButton = false,
  onPressCloseButton,
  onPressPlusButton,
}: Props) {
  return (
    <View
      style={{
        flexGrow: 0,
        height: 72,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {!showCloseButton ? (
        <SizedBox
          w={32}
          h={32}
        />
      ) : (
        <IconButton
          icon='close'
          size={32}
          onPress={onPressCloseButton}
        />
      )}
      <Headline>{title}</Headline>
      {!showPlusButton ? (
        <SizedBox
          w={32}
          h={32}
        />
      ) : (
        <IconButton
          icon='plus'
          size={32}
          onPress={onPressPlusButton}
        />
      )}
    </View>
  );
}
