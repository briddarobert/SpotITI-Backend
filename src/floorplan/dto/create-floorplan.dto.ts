import { IsNumber } from 'class-validator';

export class CreateFloorplanDto {
  @IsNumber()
  pixelToMeterRatio: number;
}
