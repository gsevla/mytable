import {
  CreateEnvironmentImageInput,
  EnvironmentImage,
  UpdateEnvironmentImageInput,
} from './EnvironmentImage';

export interface Environment {
  id: number;
  name: string;
  description?: string;
  capacity: number;
  enabled: boolean;
  restaurantId: number;
}

export type CreateEnvironmentInput = Omit<
  Environment,
  'id' | 'enabled' | 'restaurantId'
>;

export type CreateEnvironmentOutput = Environment;

export type UpdateEnvironmentInput = Omit<Environment, 'restaurantId'>;

export type UpdateEnvironmentOutput = Environment;

export type EnvironmentWithImage = Environment & {
  images: Array<EnvironmentImage>;
};

export type CreateEnvironmentWithImagesInput = CreateEnvironmentInput & {
  images?: Array<Omit<CreateEnvironmentImageInput, 'environmentId'>>;
};

export type UpdateEnvironmentWithImagesInput = UpdateEnvironmentInput & {
  images?: Array<UpdateEnvironmentImageInput>;
};
