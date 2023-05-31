import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { FloorplanService } from './floorplan.service';
import { CreateFloorplanDto } from './dto/create-floorplan.dto';
import { Floorplan } from './entities/floorplan.entity';
import { UpdateFloorplanDto } from './dto/update-floorplan.dto';
import { manageException } from 'src/errors';
import { ApiTags } from '@nestjs/swagger';

@Controller('floorplan')
@ApiTags('Piantina')
export class FloorplanController {
  constructor(private readonly floorplanService: FloorplanService) {}

  /**
   * Crea una piantina
   */
  @Post()
  async create(
    @Body() createFloorplanDto: CreateFloorplanDto,
  ): Promise<Floorplan> {
    return await this.floorplanService.create(createFloorplanDto);
  }

  /**
   * Aggiorna una piantina
   */
  @Patch()
  async update(
    @Body() updateFloorPlanDto: UpdateFloorplanDto,
  ): Promise<Floorplan> {
    try {
      return await this.floorplanService.update(updateFloorPlanDto);
    } catch (e) {
      manageException(e);
    }
  }

  /**
   * Reperisce una piantina
   */
  @Get()
  async findAll(): Promise<Floorplan> {
    try {
      return await this.floorplanService.find();
    } catch (e) {
      manageException(e);
    }
  }
}
