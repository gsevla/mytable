import { Test, TestingModule } from '@nestjs/testing';
import { ReservationOrderHistoryController } from './reservation-order-history.controller';
import { ReservationOrderHistoryService } from './reservation-order-history.service';

describe('ReservationOrderHistoryController', () => {
  let controller: ReservationOrderHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationOrderHistoryController],
      providers: [ReservationOrderHistoryService],
    }).compile();

    controller = module.get<ReservationOrderHistoryController>(ReservationOrderHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
