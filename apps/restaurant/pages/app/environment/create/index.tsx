import React from 'react';
import { AppPageWrapper } from 'components/AppPageWrapper';
import { CreateEnvironmentInput } from '@mytable/domain';
import { useRouter } from 'next/router';
import { useApiService } from '#/hooks/api/useApiService';
import { EnvironmentForm } from '#/components/Forms/Environment';

export default function AppEnvironmentCreatePage() {
  const router = useRouter();
  const apiService = useApiService();

  const { mutate } =
    apiService.resources.environment.mutations.useCreateEnvironment();

  function onFormSubmit(values: CreateEnvironmentInput, other) {
    mutate({
      ...values,
      capacity: parseInt(values.capacity, 10),
    });
    other.setSubmitting(false);
    router.back();
  }

  return (
    <AppPageWrapper>
      <EnvironmentForm onFormSubmit={onFormSubmit} />
    </AppPageWrapper>
  );
}
