import { Test, TestingModule } from '@nestjs/testing';
import { FloorplanController } from './floorplan.controller';
import { FloorplanService } from './floorplan.service';

describe('FloorplanController', () => {
  let controller: FloorplanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FloorplanController],
      providers: [FloorplanService],
    }).compile();

    controller = module.get<FloorplanController>(FloorplanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
