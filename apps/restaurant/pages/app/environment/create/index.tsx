import React from 'react';
import { AppPageWrapper } from 'components/AppPageWrapper';
import { CreateEnvironmentWithImagesInput } from '@mytable/domain';
import { useRouter } from 'next/router';
import { EnvironmentForm } from '#/components/Forms/Environment';
import { useCreateEnvironmentWithImages } from '#/hooks/api/environment/useCreateEnvironmentWithImages';

export default function AppEnvironmentCreatePage() {
  const router = useRouter();

  const { mutate } = useCreateEnvironmentWithImages();

  function onFormSubmit(values: CreateEnvironmentWithImagesInput, handlers) {
    const { capacity, ...rest } = values;
    mutate({
      capacity: parseInt(capacity, 10),
      ...rest,
    });
    handlers.setSubmitting(false);
    router.back();
  }

  return (
    <AppPageWrapper isLoading={false}>
      <EnvironmentForm onFormSubmit={onFormSubmit} />
    </AppPageWrapper>
  );
}
