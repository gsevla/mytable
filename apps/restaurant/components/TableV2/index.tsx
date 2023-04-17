import { Icon, SizedBox, Text } from '@mytable/components';
import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { DataTable } from 'react-native-paper';

export type TableColumn = {
  title: string;
  isNumeric?: boolean;
  widthMultiplier?: number;
  itemNameReference: string;
  spacing?: {
    left?: number;
    right?: number;
  };
};

export type TableRow = {
  id: string;
  data: { [itemNameReference: string]: string | React.ReactNode };
};

export type TableActionButton = {
  iconName: string;
  action(item: unknown, index: number): void;
};

export type TableV2Props = {
  data: Array<TableRow>;
  columns: Array<TableColumn>;
  actionButtons?: Array<TableActionButton>;
};

export function TableV2({ data, columns, actionButtons }: TableV2Props) {
  const isDataEmpty = useMemo(() => {
    if (!data) return true;

    return data.length === 0;
  }, [data]);

  const isActionButtonsExists = useMemo(() => {
    if (!actionButtons) return false;

    return actionButtons.length > 0;
  }, [actionButtons]);

  if (isDataEmpty)
    return (
      <View>
        <Text>Não há dados a serem listados.</Text>
      </View>
    );

  return (
    <DataTable>
      <DataTable.Header>
        {columns.map((column) => (
          <DataTable.Title
            style={{
              flex: column.widthMultiplier ?? 1,
              marginLeft: column?.spacing?.left ?? 0,
              marginRight: column?.spacing?.right ?? 0,
            }}
            numeric={column.isNumeric ?? false}
            key={`dt-col-${column.title}`}
          >
            {column.title}
          </DataTable.Title>
        ))}
        {isActionButtonsExists && (
          <DataTable.Title numeric>Ações</DataTable.Title>
        )}
      </DataTable.Header>
      {data.map((item) => (
        <DataTable.Row key={`dt-row-${item.id}`}>
          {columns.map((column) => (
            <DataTable.Cell
              numeric={column.isNumeric ?? false}
              style={{
                flex: column.widthMultiplier ?? 1,
                marginLeft: column?.spacing?.left ?? 0,
                marginRight: column?.spacing?.right ?? 0,
              }}
            >
              {item.data[column.itemNameReference]}
            </DataTable.Cell>
          ))}
          {isActionButtonsExists && (
            <DataTable.Cell numeric>
              {actionButtons?.map((actionButton, index) => (
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
            </DataTable.Cell>
          )}
        </DataTable.Row>
      ))}
    </DataTable>
  );
}
