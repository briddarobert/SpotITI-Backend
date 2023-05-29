import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Node } from 'src/nodes/entities/node.entity';

@Entity()
export class Link {
  @PrimaryColumn()
  @ManyToOne((type) => Node, (node) => node.linksWithNodeAsStart)
  nodeA: number;
  @PrimaryColumn()
  @ManyToOne((type) => Node, (node) => node.linksWithNodeAsEnd)
  nodeB: number;
  @Column()
  weight: number;
  @Column()
  type: string;
}
