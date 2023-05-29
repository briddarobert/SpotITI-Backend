import { Injectable } from '@nestjs/common';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Node } from './entities/node.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NodesService {
  constructor(
    @InjectRepository(Node) private nodesRepository: Repository<Node>,
  ) {}

  async create(createNodeDto: CreateNodeDto) {
    return (await this.nodesRepository.save(createNodeDto)).id;
  }

  async findAll(): Promise<Node[]> {
    return await this.nodesRepository.find({
      relations: {
        linksWithNodeAsStart: true,
        linksWithNodeAsEnd: true,
      },
    });
  }

  async findOne(id: number): Promise<Node> {
    return await this.nodesRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateNodeDto: UpdateNodeDto): Promise<Node> {
    await this.nodesRepository.update({ id }, updateNodeDto); // N.B.: Non viene eseguito alcun controllo per verificare l'esistenza dell'entità da aggiornare
    return this.nodesRepository.findOneByOrFail({ id: updateNodeDto.id }); // Non viene usato `id` dato che con l'aggiornamento l'ID potrebbe essere stato cambiato
  }

  async remove(id: number): Promise<void> {
    await this.nodesRepository.remove(
      await this.nodesRepository.findOneByOrFail({ id }),
    );
  }
}
