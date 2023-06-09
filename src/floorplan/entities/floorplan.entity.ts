import { Column, Entity, PrimaryColumn, ValueTransformer } from 'typeorm';

export class FloatTransformer implements ValueTransformer {
  to(value?: number): string {
    console.log(value.toString());
    return value.toString();
  }

  from(value?: string): number {
    return parseFloat(value);
  }
}

@Entity()
export class Floorplan {
  @PrimaryColumn()
  id: number;
  @Column({ type: 'float', transformer: new FloatTransformer() })
  pixelToMeterRatio: number;
}
