import { IsNumber, IsOptional } from 'class-validator';

export class CreateNodeDto {
  @IsNumber()
  x: number;
  @IsNumber()
  y: number;
  @IsNumber()
  floor: number;
  @IsNumber()
  @IsOptional()
  id?: number;
}
