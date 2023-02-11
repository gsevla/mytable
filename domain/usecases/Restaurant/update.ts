import { Restaurant, UpdateRestaurantInput } from '../../entities/Restaurant';
import { UCProtocol } from '../protocol';

export type UpdateRestaurantUC = UCProtocol<
  UpdateRestaurantInput,
  Promise<Restaurant>
>;
