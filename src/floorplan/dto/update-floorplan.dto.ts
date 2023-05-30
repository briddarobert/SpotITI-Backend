import { PartialType } from '@nestjs/swagger';
import { CreateFloorplanDto } from './create-floorplan.dto';

export class UpdateFloorplanDto extends PartialType(CreateFloorplanDto) {}
