import { AppPageWrapper } from 'components/AppPageWrapper';
import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useEmployee } from '#/hooks/api/employee/useEmployee';
import { Table } from '#/components/Table';
import { employeeRoleMap } from '../../../constants/employeeRoleMap';
import { useUpdateEmployee } from '#/hooks/api/employee/useUpdateEmployee';

const columns = [
  { title: 'Nome', itemNameReference: 'name' },
  { title: 'Usuário', itemNameReference: 'username' },
  { title: 'Tipo', itemNameReference: 'role' },
  { title: 'Estado', itemNameReference: 'enabled' },
];

export default function AppEmployeePage() {
  const router = useRouter();

  const { data: employee } = useEmployee();

  const tabulatedEmployee = useMemo(() => {
    if (!employee) return [];

    return employee.map((emp) => ({
      ...emp,
      name: `${emp.name} ${emp.surname}`,
      role: employeeRoleMap[emp.role],
      enabled: emp.enabled ? 'Ativo' : 'Inativo',
    }));
  }, [employee]);

  const { mutate } = useUpdateEmployee({
    onSuccess: (_) => {
      router.push(router.route);
    },
  });

  return (
    <AppPageWrapper>
      <Table
        data={tabulatedEmployee}
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
              mutate({
                id: item.id,
                enabled: false,
              });
            },
          },
          {
            iconName: 'check',
            action: (item, index) => {
              mutate({
                id: item.id,
                enabled: true,
              });
            },
          },
        ]}
      />
    </AppPageWrapper>
  );
}
