import { EnvironmentImage } from './EnvironmentImage';

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
