import { Day } from '../enums/Day';

export interface WorkingDay {
  id: string;
  day: Day;
  openingTime: string;
  closingTime: string;
  restaurantId: number;
}

export type CreateWorkingDayInput = Omit<WorkingDay, 'id' | 'restaurantId'>;

export type CreateWorkingDayOutput = WorkingDay;
