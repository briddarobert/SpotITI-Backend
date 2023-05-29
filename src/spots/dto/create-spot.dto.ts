import {
  IsArray,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSpotDto {
  @IsString()
  name: string;
  @IsInt()
  category: number;
  @IsArray()
  nodes: number[];
  @IsObject()
  @IsOptional()
  data?: Record<string, any>;
}
