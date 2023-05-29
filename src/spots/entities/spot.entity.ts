import { Category } from 'src/categories/entities/category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Node } from 'src/nodes/entities/node.entity';

@Entity()
export class Spot {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToOne((type) => Category, (category) => category.id)
  category: Category;
  @ManyToMany(() => Node)
  @JoinTable()
  nodes: Node[];
  @Column()
  data: string;
}
