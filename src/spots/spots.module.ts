import { Module } from '@nestjs/common';
import { SpotsService } from './spots.service';
import { SpotsController } from './spots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spot } from './entities/spot.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { NodesModule } from 'src/nodes/nodes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Spot]), CategoriesModule, NodesModule],
  exports: [SpotsService],
  controllers: [SpotsController],
  providers: [SpotsService],
})
export class SpotsModule {}
