import React from 'react';
import { AppPageWrapper } from 'components/AppPageWrapper';
import { CreateEmployeeInput } from '@mytable/domain';
import { useRouter } from 'next/router';
import { EmployeeForm } from '#/components/Forms/Employee';
import { useApiService } from '#/hooks/api/useApiService';

export default function AppEmployeeCreatePage() {
  const router = useRouter();
  const apiService = useApiService();

  const { mutate } =
    apiService.resources.employee.mutations.useCreateEmployee();

  function onFormSubmit(values: CreateEmployeeInput, other) {
    mutate(values);
    other.setSubmitting(false);
    router.back();
  }

  return (
    <AppPageWrapper isLoading={false}>
      <EmployeeForm onFormSubmit={onFormSubmit} />
    </AppPageWrapper>
  );
}
