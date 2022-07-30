import { Test, TestingModule } from '@nestjs/testing';
import { ReservationOrderService } from './reservation-order.service';

describe('ReservationOrderService', () => {
  let service: ReservationOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationOrderService],
    }).compile();

    service = module.get<ReservationOrderService>(ReservationOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
