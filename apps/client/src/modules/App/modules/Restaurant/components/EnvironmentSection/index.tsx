import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Subheading, Paragraph, Caption } from 'react-native-paper';
import { SizedBox } from '../../../../../../components/SizedBox';
import { AppRestaurantImageComponent } from '../Image';

interface Props {
  title: string;
  description: string;
  images?: Array<{
    id: number;
    source: NodeRequire;
  }>;
}

export function AppRestaurantEnvironmentSectionComponent({
  title,
  description,
  images,
}: Props) {
  return (
    <View>
      <Subheading style={styles.spaceTitle}>{title}</Subheading>
      <Paragraph>{description}</Paragraph>
      {(() => {
        if (!images) {
          return <Caption>(Imagens não disponibilizadas)</Caption>;
        }

        if (images.length > 0) {
          return (
            <ScrollView horizontal>
              {images.map((item, index, arr) => (
                <React.Fragment key={item.id.toString()}>
                  <AppRestaurantImageComponent
                    imageProps={{
                      source: {
                        uri: item.source,
                      },
                    }}
                  />
                  {index < arr.length - 1 && <SizedBox />}
                </React.Fragment>
              ))}
            </ScrollView>
          );
        }

        return null;
      })()}
    </View>
  );
}

const styles = StyleSheet.create({
  spaceTitle: {
    fontWeight: 'bold',
  },
});
