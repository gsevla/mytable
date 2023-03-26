import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { AppPageWrapper } from '#/components/AppPageWrapper';
import { Table } from '#/components/Table';
import { useEnvironment } from '#/hooks/api/environment/useEnvironment';
import { useUpdateEnvironment } from '#/hooks/api/environment/useUpdateEnvironment';

const columns = [
  { title: 'Nome', itemNameReference: 'name' },
  { title: 'Capacidade', itemNameReference: 'capacity' },
  { title: 'Descrição', itemNameReference: 'description' },
  { title: 'Estado', itemNameReference: 'enabled' },
];

export default function AppEnvironmentPage() {
  const router = useRouter();

  const { data: environments } = useEnvironment();

  const tabulatedEnvironments = useMemo(() => {
    if (!environments) return [];

    return environments.map((environment) => ({
      ...environment,
      enabled: environment.enabled ? 'Ativo' : 'Inativo',
    }));
  }, [environments]);

  const { mutate } = useUpdateEnvironment();

  return (
    <AppPageWrapper>
      <Table
        data={tabulatedEnvironments}
        columns={columns}
        actionButtons={[
          {
            iconName: 'pencil',
            action: (item, index) => {
              router.push(`${router.route}/edit/${item.id}`);
            },
          },
          {
            iconName: 'close',
            action: (item, index) => {
              mutate({ id: item.id, enabled: false });
              // mutate({
              //   id: item.id,
              //   enabled: false,
              // });
            },
          },
          {
            iconName: 'check',
            action: (item, index) => {
              mutate({ id: item.id, enabled: true });
              // mutate({
              //   id: item.id,
              //   enabled: true,
              // });
            },
          },
        ]}
      />
    </AppPageWrapper>
  );
}
