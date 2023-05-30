import { Module } from '@nestjs/common';
import { FloorplanService } from './floorplan.service';
import { FloorplanController } from './floorplan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Floorplan } from './entities/floorplan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Floorplan])],
  controllers: [FloorplanController],
  providers: [FloorplanService],
})
export class FloorplanModule {}
