import { AppPageWrapper } from 'components/AppPageWrapper';
import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { View } from 'react-native';
import { Icon, SizedBox } from '@mytable/components';
import { useEmployee } from '#/hooks/api/employee/useEmployee';
import { employeeRoleMap } from '../../../constants/employeeRoleMap';
import { useUpdateEmployee } from '#/hooks/api/employee/useUpdateEmployee';
import { TableRow, TableV2 } from '#/components/TableV2';
import { Item, Menu } from '#/components/Menu';

const columns = [
  { title: 'Nome', itemNameReference: 'name' },
  { title: 'Usuário', itemNameReference: 'username' },
  { title: 'Tipo', itemNameReference: 'role' },
  { title: 'Estado', itemNameReference: 'enabled' },
];

const employeeStatus = {
  true: 'Ativo',
  false: 'Inativo',
};

export default function AppEmployeePage() {
  const router = useRouter();

  const { data: employee, isLoading } = useEmployee();

  const { mutate } = useUpdateEmployee();

  const mountEmployeeStatusItems = useCallback(
    (employeeId: number) =>
      Object.entries(employeeStatus).map(([key, value]) => ({
        key,
        label: value,
        action: (item: Item) => {
          mutate({
            id: employeeId,
            enabled: item.key === 'true',
          });
        },
      })),
    []
  );

  const tabulatedEmployee = useMemo(() => {
    if (!employee) return [];

    return employee.reduce((accu, emp) => {
      accu.push({
        id: emp.id.toString(),
        data: {
          username: emp.username,
          name: `${emp.name} ${emp.surname}`,
          role: employeeRoleMap[emp.role],
          enabled: (
            <Menu items={mountEmployeeStatusItems(emp.id)}>
              <View style={{ flexDirection: 'row' }}>
                <>{emp.enabled ? 'Ativo' : 'Inativo'}</>
                <SizedBox w={4} />
                <Icon
                  name='chevron-down'
                  size={16}
                />
              </View>
            </Menu>
          ),
        },
      });

      return accu;
    }, [] as Array<TableRow>);
  }, [employee, mountEmployeeStatusItems]);

  return (
    <AppPageWrapper isLoading={isLoading}>
      <TableV2
        columns={columns}
        data={tabulatedEmployee}
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
