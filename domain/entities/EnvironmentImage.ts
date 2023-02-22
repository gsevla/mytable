export interface EnvironmentImage {
  id: string;
  environmentId: number;
  addr: string;
  description?: string;
}

export type CreateEnvironmentImageInput = Omit<EnvironmentImage, 'id'>;

export type CreateEnvironmentImageOutput = EnvironmentImage;

export type UpdateEnvironmentImageInput = CreateEnvironmentImageInput;

export type UpdateEnvironmentImageOutput = EnvironmentImage;
