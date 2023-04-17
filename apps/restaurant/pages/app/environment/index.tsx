import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { View } from 'react-native';
import { Icon, SizedBox } from '@mytable/components';
import { AppPageWrapper } from '#/components/AppPageWrapper';
import { useEnvironment } from '#/hooks/api/environment/useEnvironment';
import { useUpdateEnvironment } from '#/hooks/api/environment/useUpdateEnvironment';
import { TableColumn, TableRow, TableV2 } from '#/components/TableV2';
import { Item, Menu } from '#/components/Menu';

const columns: Array<TableColumn> = [
  {
    title: 'Nome',
    itemNameReference: 'name',
    spacing: {
      right: 24,
    },
  },
  {
    title: 'Descrição',
    itemNameReference: 'description',
    widthMultiplier: 3,
    spacing: {
      right: 24,
    },
  },
  { title: 'Estado', itemNameReference: 'enabled' },
  {
    title: 'Capacidade',
    itemNameReference: 'capacity',
    isNumeric: true,
    widthMultiplier: 0.6,
    spacing: {
      right: 24,
    },
  },
];

const environmentStatus = {
  true: 'Ativo',
  false: 'Inativo',
};

export default function AppEnvironmentPage() {
  const router = useRouter();

  const { data: environments, isLoading } = useEnvironment();

  const mountEnvironmentStatusItems = useCallback(
    (environmentId: number) =>
      Object.entries(environmentStatus).map(([key, value]) => ({
        key,
        label: value,
        action: (item: Item) => {
          mutate({
            id: environmentId,
            enabled: item.key === 'true',
          });
        },
      })),
    []
  );

  const tabulatedEnvironments = useMemo(() => {
    if (!environments) return [];

    return environments.map(
      (environment) =>
        ({
          id: environment.id.toString(),
          data: {
            name: environment.name,
            capacity: environment.capacity,
            description: environment.description,
            enabled: (
              <Menu items={mountEnvironmentStatusItems(environment.id)}>
                <View style={{ flexDirection: 'row' }}>
                  <>{environment.enabled ? 'Ativo' : 'Inativo'}</>
                  <SizedBox w={4} />
                  <Icon
                    name='chevron-down'
                    size={16}
                  />
                </View>
              </Menu>
            ),
          },
        } as TableRow)
    );
  }, [environments, mountEnvironmentStatusItems]);

  const { mutate } = useUpdateEnvironment();

  return (
    <AppPageWrapper isLoading={isLoading}>
      <TableV2
        columns={columns}
        data={tabulatedEnvironments}
        actionButtons={[
          {
            iconName: 'pencil',
            action: (item) => {
              router.push(`${router.route}/edit/${item.id}`);
            },
          },
        ]}
      />
    </AppPageWrapper>
  );
}
