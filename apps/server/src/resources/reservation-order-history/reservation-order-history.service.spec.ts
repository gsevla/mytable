import { Test, TestingModule } from '@nestjs/testing';
import { ReservationOrderHistoryService } from './reservation-order-history.service';

describe('ReservationOrderHistoryService', () => {
  let service: ReservationOrderHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationOrderHistoryService],
    }).compile();

    service = module.get<ReservationOrderHistoryService>(ReservationOrderHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
