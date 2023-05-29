import { Link } from 'src/links/entities/link.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Node {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  x: number;
  @Column()
  y: number;
  @Column()
  floor: number;
  @OneToMany((type) => Link, (link) => link.nodeA)
  linksWithNodeAsStart: Link[];
  @OneToMany((type) => Link, (link) => link.nodeB)
  linksWithNodeAsEnd: Link[];
}
