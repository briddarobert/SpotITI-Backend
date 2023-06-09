import { Injectable } from '@nestjs/common';
import { UpdateFloorplanDto } from './dto/update-floorplan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Floorplan } from './entities/floorplan.entity';
import { Repository } from 'typeorm';
import { CreateFloorplanDto } from './dto/create-floorplan.dto';

@Injectable()
export class FloorplanService {
  constructor(
    @InjectRepository(Floorplan)
    private floorplanRepository: Repository<Floorplan>,
  ) {}

  async create(createFloorplanDto: CreateFloorplanDto): Promise<Floorplan> {
    return await this.floorplanRepository.save({
      ...createFloorplanDto,
      id: 1,
    });
  }

  async find(): Promise<Floorplan> {
    let floorplan: Floorplan = await this.floorplanRepository.findOneByOrFail({
      id: 1,
    });
    return { ...floorplan, pixelToMeterRatio: floorplan.pixelToMeterRatio };
  }

  async update(updateFloorplanDto: UpdateFloorplanDto): Promise<Floorplan> {
    await this.floorplanRepository.update({ id: 1 }, updateFloorplanDto);
    return await this.find();
  }
}
