import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { NodesModule } from 'src/nodes/nodes.module';
import { SpotsModule } from 'src/spots/spots.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [NodesModule, SpotsModule, CategoriesModule],
  controllers: [RouteController],
  providers: [RouteService],
})
export class RouteModule {}
