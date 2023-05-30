import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NodesModule } from './nodes/nodes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node } from './nodes/entities/node.entity';
import { LinksModule } from './links/links.module';
import { SpotsModule } from './spots/spots.module';
import { CategoriesModule } from './categories/categories.module';
import { RouteModule } from './route/route.module';
import { FloorplanModule } from './floorplan/floorplan.module';

@Module({
  imports: [
    NodesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env['DB_PWD'],
      database: 'bussola',
      entities: [Node],
      synchronize: true,
      autoLoadEntities: true,
    }),
    LinksModule,
    SpotsModule,
    CategoriesModule,
    RouteModule,
    FloorplanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
