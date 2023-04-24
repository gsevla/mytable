import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Provider, Menu as PaperMenu, Portal } from 'react-native-paper';

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
        <PaperMenu
          visible={isMenuVisible}
          style={{
            zIndex: 999,
            position: 'absolute',
          }}
          contentStyle={{
            backgroundColor: '#ccc',
            zIndex: 999,
          }}
          onDismiss={hideMenu}
          anchor={withPressable(children)}
        >
          <Portal>
            <View
              style={{
                backgroundColor: '#ccc',
                display: isMenuVisible ? 'flex' : 'none',
                position: 'absolute',
                zIndex: 1001,
                borderRadius: 8,
                left: 48,
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
                    width: 72,
                  }}
                />
              ))}
            </View>
          </Portal>
        </PaperMenu>
      </View>
    </Provider>
  );
}
