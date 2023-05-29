import { Spot } from 'src/spots/entities/spot.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany((type) => Spot, (spot) => spot.category)
  spots: Spot[];
}
