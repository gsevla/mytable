import { Day } from '../enums/Day';

export interface WorkingDay {
  id: number;
  day: Day;
  openingTime: string;
  closingTime: string;
  restaurantId: number;
  open?: boolean;
}

export type CreateWorkingDayInput = Omit<
  WorkingDay,
  'id' | 'restaurantId' | 'open'
>;

export type UpdateWorkingDayInput = Partial<
  Omit<WorkingDay, 'id' | 'restaurantId'>
> & {
  id: number;
};
