import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Floorplan {
  @PrimaryColumn()
  id: number;
  @Column()
  pixelToMeterRatio: number;
}
