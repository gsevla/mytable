import React, { useState } from 'react';
import { Image, ImageProps, Pressable, StyleSheet } from 'react-native';
import { AppRestaurantImageModalComponent } from '../ImageModal';

interface Props {
  imageProps: ImageProps;
}

export function AppRestaurantImageComponent({ imageProps }: Props) {
  const [isModalImageVisible, setIsModalImageVisible] = useState(false);

  function showModalImage() {
    setIsModalImageVisible(true);
  }

  function closeModalImage() {
    setIsModalImageVisible(false);
  }

  return (
    <>
      <AppRestaurantImageModalComponent
        visible={isModalImageVisible}
        imageSrc={imageProps?.source}
        onPressClose={closeModalImage}
      />
      <Pressable onPress={showModalImage}>
        <Image
          style={styles.image}
          {...imageProps}
        />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});
