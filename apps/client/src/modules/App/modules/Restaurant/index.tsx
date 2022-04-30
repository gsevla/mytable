import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Headline, Title, Subheading } from 'react-native-paper';
import { SizedBox } from '../../../../components/SizedBox';
import { AppRestaurantEnvironmentSectionComponent } from './components/EnvironmentSection';

export function Restaurant() {
  const mockedImages = [
    {
      id: 1,
      source: require('../../../../../assets/fc1.jpg'),
    },
    {
      id: 2,
      source: require('../../../../../assets/fc2.jpg'),
    },
    {
      id: 3,
      source: require('../../../../../assets/fc3.jpg'),
    },
    {
      id: 4,
      source: require('../../../../../assets/fc4.jpg'),
    },
  ];

  const mockedSections = [
    {
      id: 1,
      title: 'Espaço X',
      description: `Lorem ipsum vivamus potenti ligula potenti vivamus pretium, consectetur ligula est tempus iaculis aenean metus, congue nec lorem interdum ullamcorper enim. fusce habitasse iaculis blandit purus aliquam tempus egestas ligula maecenas cubilia feugiat, ornare velit diam sit porta eget cubilia donec ut pretium. hendrerit ut est sapien lectus cursus netus suscipit consequat, ipsum in tempus lobortis vel porta risus hac praesent, enim habitasse euismod cubilia quis justo sagittis. posuere convallis litora congue gravida conubia magna ipsum ac consequat id vestibulum, in pharetra hendrerit porta consectetur quisque venenatis vulputate pellentesque posuere, vulputate dictumst augue feugiat dui consequat metus velit aenean neque. `,
      images: mockedImages,
    },
    {
      id: 2,
      title: 'Espaço Y',
      description: `Lorem ipsum vivamus potenti ligula potenti vivamus pretium, consectetur ligula est tempus iaculis aenean metus, congue nec lorem interdum ullamcorper enim. fusce habitasse iaculis blandit purus aliquam tempus egestas ligula maecenas cubilia feugiat, ornare velit diam sit porta eget cubilia donec ut pretium. hendrerit ut est sapien lectus cursus netus suscipit consequat, ipsum in tempus lobortis vel porta risus hac praesent, enim habitasse euismod cubilia quis justo sagittis. posuere convallis litora congue gravida conubia magna ipsum ac consequat id vestibulum, in pharetra hendrerit porta consectetur quisque venenatis vulputate pellentesque posuere, vulputate dictumst augue feugiat dui consequat metus velit aenean neque. `,
    },
    {
      id: 3,
      title: 'Espaço Z',
      description: `Lorem ipsum vivamus potenti ligula potenti vivamus pretium, consectetur ligula est tempus iaculis aenean metus, congue nec lorem interdum ullamcorper enim. fusce habitasse iaculis blandit purus aliquam tempus egestas ligula maecenas cubilia feugiat, ornare velit diam sit porta eget cubilia donec ut pretium. hendrerit ut est sapien lectus cursus netus suscipit consequat, ipsum in tempus lobortis vel porta risus hac praesent, enim habitasse euismod cubilia quis justo sagittis. posuere convallis litora congue gravida conubia magna ipsum ac consequat id vestibulum, in pharetra hendrerit porta consectetur quisque venenatis vulputate pellentesque posuere, vulputate dictumst augue feugiat dui consequat metus velit aenean neque. `,
      images: mockedImages,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Headline>
        Aqui você encontra informações a respeito do restaurante
      </Headline>

      <SizedBox h={24} />

      <Title>Funcionamento</Title>
      <View style={styles.workingTimeContainer}>
        <View>
          <Subheading>Segunda-Feira</Subheading>
          <Subheading>Terça-Feira</Subheading>
          <Subheading>Quarta-Feira</Subheading>
          <Subheading>Quinta-Feira</Subheading>
          <Subheading>Sexta-Feira</Subheading>
          <Subheading>Sábado</Subheading>
          <Subheading>Domingo</Subheading>
        </View>
        <SizedBox />
        <View>
          <Subheading>Fechado</Subheading>
          <Subheading>08:00 - 12:00 | 14:00 - 18:00</Subheading>
          <Subheading>08:00 - 12:00</Subheading>
          <Subheading>08:00 - 12:00</Subheading>
          <Subheading>08:00 - 12:00</Subheading>
          <Subheading>08:00 - 12:00</Subheading>
          <Subheading>08:00 - 12:00</Subheading>
        </View>
      </View>

      <SizedBox h={24} />

      <Title>Espaços</Title>
      {mockedSections.map((item, index, arr) => {
        return (
          <React.Fragment key={item.id.toString()}>
            <AppRestaurantEnvironmentSectionComponent
              title={item.title}
              description={item.description}
              images={item?.images}
            />
            {index < arr.length - 1 && <SizedBox />}
          </React.Fragment>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  workingTimeContainer: {
    flexDirection: 'row',
  },
});
