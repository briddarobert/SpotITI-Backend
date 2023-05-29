import { Module } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { NodesController } from './nodes.controller';
import { Node } from './entities/node.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Node])],
  exports: [NodesService],
  controllers: [NodesController],
  providers: [NodesService],
})
export class NodesModule {}
