import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  Image,
  useWindowDimensions,
} from 'react-native';
import { Icon } from '../../../../../../components/Icon';
import { SizedBox } from '../../../../../../components/SizedBox';

interface Props {
  visible: boolean;
  imageSrc: NodeRequire;
  onPressClose(): void;
}

export function AppRestaurantImageModalComponent({
  visible,
  imageSrc,
  onPressClose,
}: Props) {
  const dimensions = useWindowDimensions();

  const imageSizeOffset = 48;
  const imageSize = {
    height: '75%',
    width: dimensions.width - imageSizeOffset,
  };
  const closeButtonHitSlop = { bottom: 16, top: 16, left: 16, right: 16 };

  return (
    <Modal
      visible={visible}
      animationType='fade'
      transparent
    >
      <View style={styles.content}>
        <Image
          source={imageSrc}
          style={imageSize}
          resizeMode='contain'
        />
        <SizedBox />
        <Pressable
          onPress={onPressClose}
          hitSlop={closeButtonHitSlop}
        >
          <Icon
            name='close'
            color='#fff'
          />
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    backgroundColor: '#000000aa',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
