export interface EnvironmentImage {
  id: number;
  environmentId: number;
  addr: string;
  description?: string;
}

export type CreateEnvironmentImageInput = Omit<EnvironmentImage, 'id'>;

export type CreateEnvironmentImageOutput = EnvironmentImage;

export type UpdateEnvironmentImageInput = Partial<
  Omit<EnvironmentImage, 'environmentId'>
> & {
  id: number;
};

export type UpdateEnvironmentImageOutput = EnvironmentImage;
