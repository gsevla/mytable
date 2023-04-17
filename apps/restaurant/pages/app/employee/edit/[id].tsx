import React from 'react';
import { useRouter } from 'next/router';
import { UpdateEmployeeInput } from '@mytable/domain';
import { AppPageWrapper } from '#/components/AppPageWrapper';
import { EmployeeForm } from '#/components/Forms/Employee';
import { useEmployeeById } from '#/hooks/api/employee/useEmployeeById';
import { useUpdateEmployee } from '#/hooks/api/employee/useUpdateEmployee';

export default function AppEmployeeEditPage() {
  const router = useRouter();

  const { id } = router.query;

  const { data: employee, isLoading } = useEmployeeById(
    parseInt(id as string, 10)
  );

  const { mutate } = useUpdateEmployee();
  function onFormSubmit(values: UpdateEmployeeInput, other) {
    mutate({
      id: parseInt(id as string, 10),
      ...values,
    });
    other.setSubmitting(false);
    router.back();
  }

  return (
    <AppPageWrapper isLoading={isLoading}>
      <EmployeeForm
        employee={employee}
        onFormSubmit={onFormSubmit}
      />
    </AppPageWrapper>
  );
}
