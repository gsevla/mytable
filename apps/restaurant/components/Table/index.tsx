import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Icon, SizedBox, Text } from '@mytable/components';

type Column = {
  title: string;
  itemNameReference: string;
};

type ActionButton = {
  iconName: string;
  action(item: unknown, index: number): void;
};

export type TableProps = {
  data: Array<unknown>;
  columns: Array<Column>;
  actionButtons?: Array<ActionButton>;
};

export function Table({ data, columns, actionButtons }: TableProps) {
  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <View
          style={{
            padding: 8,
            backgroundColor: index % 2 === 0 ? '#fff' : '#eee',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {columns.map((column) => (
            <View
              key={column.itemNameReference}
              style={{ flex: 1 }}
            >
              <Text>{item[column.itemNameReference]}</Text>
            </View>
          ))}
          {typeof actionButtons !== 'undefined' && (
            <View
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            >
              {actionButtons.map((actionButton) => (
                <React.Fragment key={actionButton.iconName}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => actionButton.action(item, index)}
                  >
                    <Icon name={actionButton.iconName} />
                  </TouchableOpacity>
                  <SizedBox w={4} />
                </React.Fragment>
              ))}
            </View>
          )}
        </View>
      )}
      ListHeaderComponent={() => {
        if (data.length === 0) return null;

        return (
          <View
            style={{ borderBottomWidth: 1, padding: 8, flexDirection: 'row' }}
          >
            {columns.map((column) => (
              <View
                key={column.title}
                style={{ flex: 1 }}
              >
                <Text
                  size='lg'
                  weight='bold'
                >
                  {column.title}
                </Text>
              </View>
            ))}
            {typeof actionButtons !== 'undefined' && (
              <View style={{ flex: 1 }}>
                <Text
                  size='lg'
                  weight='bold'
                >
                  Ações
                </Text>
              </View>
            )}
          </View>
        );
      }}
      ItemSeparatorComponent={() => <SizedBox h={8} />}
      ListEmptyComponent={() => (
        <View>
          <Text>Não há dados a serem listados.</Text>
        </View>
      )}
    />
  );
}
