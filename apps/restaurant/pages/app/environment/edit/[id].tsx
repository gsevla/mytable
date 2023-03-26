import React from 'react';
import { useRouter } from 'next/router';
import { UpdateEmployeeInput } from '@mytable/domain';
import { AppPageWrapper } from '#/components/AppPageWrapper';
import { EnvironmentForm } from '#/components/Forms/Environment';
import { useEnvironmentById } from '#/hooks/api/environment/useEnvironmentById';
import { useUpdateEnvironment } from '#/hooks/api/environment/useUpdateEnvironment';

export default function AppEmployeeEditPage() {
  const router = useRouter();

  const { id } = router.query;

  const { data: environment } = useEnvironmentById(parseInt(id, 10));

  const { mutate } = useUpdateEnvironment();
  function onFormSubmit(values: UpdateEmployeeInput, other) {
    mutate({
      id: parseInt(id, 10),
      ...values,
      capacity: parseInt(values.capacity, 10),
    });
    other.setSubmitting(false);
    router.back();
  }

  return (
    <AppPageWrapper>
      <EnvironmentForm
        environment={environment}
        onFormSubmit={onFormSubmit}
      />
    </AppPageWrapper>
  );
}
