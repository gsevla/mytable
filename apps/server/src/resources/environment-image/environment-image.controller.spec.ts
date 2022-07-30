import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentImageController } from './environment-image.controller';
import { EnvironmentImageService } from './environment-image.service';

describe('EnvironmentImageController', () => {
  let controller: EnvironmentImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnvironmentImageController],
      providers: [EnvironmentImageService],
    }).compile();

    controller = module.get<EnvironmentImageController>(EnvironmentImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
