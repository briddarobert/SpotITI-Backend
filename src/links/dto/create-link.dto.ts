import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLinkDto {
  @IsInt()
  nodeA: number;
  @IsInt()
  nodeB: number;
  @IsNumber()
  @IsOptional()
  weight?: number;
  @IsString()
  type: string;
}
