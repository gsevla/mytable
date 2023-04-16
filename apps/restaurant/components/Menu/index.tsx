import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Provider, Menu as PaperMenu } from 'react-native-paper';

export type Item = {
  key: string;
  label: string;
  action(itemPressed: Item): void;
};

export type MenuProps = {
  items: Array<Item>;
  children: React.ReactElement;
};

export function Menu({ items, children }: MenuProps) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  function showMenu() {
    setIsMenuVisible(true);
  }

  function hideMenu() {
    setIsMenuVisible(false);
  }

  function withPressable(element: React.ReactElement) {
    return React.createElement(
      Pressable,
      {
        onPress: showMenu,
      },
      element
    );
  }

  return (
    <Provider>
      <View style={{ zIndex: 1500 }}>
        {withPressable(children)}
        <PaperMenu
          visible={isMenuVisible}
          style={{ zIndex: 999, position: 'absolute' }}
          contentStyle={{
            backgroundColor: '#ccc',
            zIndex: 999,
          }}
          onDismiss={hideMenu}
          anchor={{
            x: 96, // workaround because menu is behing other elements
            y: 36,
          }}
        >
          {items.map((item) => (
            <PaperMenu.Item
              key={`menu-item-${item.key}`}
              title={item.label}
              onPress={() => {
                item?.action(item);
                hideMenu();
              }}
              titleStyle={{
                color: '#000',
              }}
            />
          ))}
        </PaperMenu>
      </View>
    </Provider>
  );
}
