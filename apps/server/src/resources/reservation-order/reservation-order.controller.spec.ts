import { Test, TestingModule } from '@nestjs/testing';
import { ReservationOrderController } from './reservation-order.controller';
import { ReservationOrderService } from './reservation-order.service';

describe('ReservationOrderController', () => {
  let controller: ReservationOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationOrderController],
      providers: [ReservationOrderService],
    }).compile();

    controller = module.get<ReservationOrderController>(ReservationOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
