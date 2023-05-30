import { Test, TestingModule } from '@nestjs/testing';
import { FloorplanService } from './floorplan.service';

describe('FloorplanService', () => {
  let service: FloorplanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FloorplanService],
    }).compile();

    service = module.get<FloorplanService>(FloorplanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
