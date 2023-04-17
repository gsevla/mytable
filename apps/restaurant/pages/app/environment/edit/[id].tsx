import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { UpdateEmployeeInput } from '@mytable/domain';
import { AppPageWrapper } from '#/components/AppPageWrapper';
import { EnvironmentForm } from '#/components/Forms/Environment';
import { useUpdateEnvironmentWithImages } from '#/hooks/api/environment/useUpdateEnvironmentWithImages';
import { useEnvironmentByIdWithImages } from '#/hooks/api/environment/useEnvironmentByIdWithImages';

export default function AppEmployeeEditPage() {
  const router = useRouter();

  const { id } = router.query;

  const { data: environment, isLoading } = useEnvironmentByIdWithImages(
    parseInt(id, 10)
  );

  const normalizedEnvironment = useMemo(
    () => ({
      ...environment,
      images: environment?.images.map((image) => {
        if (image.description !== null) return image;

        return {
          ...image,
          description: '',
        };
      }),
    }),
    [environment]
  );

  const { mutate } = useUpdateEnvironmentWithImages();
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
    <AppPageWrapper isLoading={isLoading}>
      <EnvironmentForm
        environment={normalizedEnvironment}
        onFormSubmit={onFormSubmit}
      />
    </AppPageWrapper>
  );
}
