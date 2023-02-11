import { Restaurant } from '../../entities/Restaurant';
import { UCProtocol } from '../protocol';

export type FindRestaurantUC = UCProtocol<void, Promise<Restaurant>>;
