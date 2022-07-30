import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentImageService } from './environment-image.service';

describe('EnvironmentImageService', () => {
  let service: EnvironmentImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvironmentImageService],
    }).compile();

    service = module.get<EnvironmentImageService>(EnvironmentImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
